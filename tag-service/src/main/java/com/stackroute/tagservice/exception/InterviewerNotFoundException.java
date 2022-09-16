package com.stackroute.tagservice.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class InterviewerNotFoundException extends RuntimeException{
    public InterviewerNotFoundException(String message) {
        super(message);
    }

    public InterviewerNotFoundException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
