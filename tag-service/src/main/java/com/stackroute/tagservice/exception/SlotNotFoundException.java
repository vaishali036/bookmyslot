package com.stackroute.tagservice.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class SlotNotFoundException extends RuntimeException{
    public SlotNotFoundException(String message) {
        super(message);
    }

    public SlotNotFoundException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
