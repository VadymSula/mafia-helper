package org.deanoffice2.mafiahelper.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class IllegalInputDataException extends RuntimeException {
    public IllegalInputDataException(Object inputDataValue, String fieldName) {
        super("Invalid input data: [" + fieldName + " = " + inputDataValue.toString() + "]");
    }
}
