package com.stackroute.tagservice.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class TagMemberNotFoundException extends RuntimeException{
    public TagMemberNotFoundException(String message) {
        super(message);
    }

    public TagMemberNotFoundException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
