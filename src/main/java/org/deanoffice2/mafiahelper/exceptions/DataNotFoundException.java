package org.deanoffice2.mafiahelper.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DataNotFoundException extends RuntimeException {

    public DataNotFoundException(String nameParameter, Object searchingParameter) {
        super("On parameter [" + nameParameter + " = " + searchingParameter.toString() + "] - data not found");
    }

    public DataNotFoundException() {
        super("Data not found");
    }
}
