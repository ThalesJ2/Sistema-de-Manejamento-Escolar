package com.example.Sistema.de.manejamento.services.exceptions;

public class ResourceBadRequestException extends  RuntimeException{
    public ResourceBadRequestException(String message) {
        super(message);
    }
}
