package cardihab.test;

import com.mashape.unirest.http.exceptions.UnirestException;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import cardihab.test.models.RequestResult;

@RestController
public class CardihabRestController {

    @RequestMapping("/search_medication")
    public ResponseEntity<?> index(@RequestParam(value = "username", defaultValue = "") String username, @RequestParam(value = "password", defaultValue = "") String password, @RequestParam(value = "term", defaultValue = "") String medication_list) throws UnirestException, IOException {
        RestProxyClient client = new RestProxyClient("https://api-dev.cardihab.app/v1");
        RequestResult<?> result = client.Search(username, password, medication_list);        
        return new ResponseEntity<>(result, result.httpStatus);
    }
}
