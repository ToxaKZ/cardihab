package cardihab.test.models;

import org.springframework.http.HttpStatus;

public class RequestResult<T> {
    public HttpStatus httpStatus;
    public T data;
}
