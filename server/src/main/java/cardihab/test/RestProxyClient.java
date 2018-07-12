package cardihab.test;

import cardihab.test.models.LoginResult;
import com.mashape.unirest.http.*;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import cardihab.test.models.ErrorResult;
import cardihab.test.models.Medication;
import cardihab.test.models.RequestResult;

public class RestProxyClient {

    String requestUrl = "";

    public RestProxyClient(String requestUrl) {
        this.requestUrl = requestUrl;
    }

    private LoginResult Login(String username, String password) throws UnirestException {
        LoginResult loginResult = new LoginResult();

        HttpResponse<String> response = Unirest.post(requestUrl + "/login")
                .header("accept", "application/json")
                .body("{\"username\":\""+username+"\", \"password\":\""+password+"\"}")
                .asString();

        int status = response.getStatus();

        if (status != 200) {
            loginResult.result = false;
        } else {
            loginResult.result = true;
            loginResult.token = response.getBody();
        }

        return loginResult;
    }

    public RequestResult<?> Search(String username, String password, String medication_list) throws UnirestException, IOException {
        LoginResult loginResult = Login(username, password);
        if (loginResult.result) {
            return DoSearchRequest(loginResult.token.replaceAll("\"",""), medication_list);
        } else {
            RequestResult<String> result = new RequestResult<>();
            result.httpStatus = HttpStatus.UNAUTHORIZED;
            return result;
        }
    }

    private RequestResult<?> DoSearchRequest(String token, String medication_list) throws UnirestException, IOException {
        HttpResponse<JsonNode> restResponse = Unirest.get(requestUrl + "/medications/search")
                .queryString("count", 3)
                .queryString("term", medication_list)
                .header("Authorization", "Bearer "+token)
                .asJson();

        if (restResponse.getStatus() == 200) {
            RequestResult<Medication[]> result = new RequestResult<>();
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();  
            Medication[] arrayResult = mapper.readValue(restResponse.getBody().toString(), Medication[].class);  
            result.httpStatus = HttpStatus.OK;
            result.data = arrayResult;
            return result;
        } else {
            RequestResult<ErrorResult> result = new RequestResult<>();
            result.httpStatus = HttpStatus.valueOf(restResponse.getStatus());
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();  
            ErrorResult error = mapper.readValue(restResponse.getBody().toString(), ErrorResult.class);      
            result.data = error;
            return result;
        }
    }
    
    

}
