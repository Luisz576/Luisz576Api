package com.luisz.luisz576api.domain.exceptions;

public class ApiNotLoadedException extends Exception {
    public final String reason;

    public ApiNotLoadedException(String reason){
        this.reason = reason;
    }
}