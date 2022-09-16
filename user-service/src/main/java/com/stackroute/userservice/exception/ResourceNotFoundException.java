package com.stackroute.userservice.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This class will handle the exceptions for Resource not found
 */

@ResponseStatus
public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
