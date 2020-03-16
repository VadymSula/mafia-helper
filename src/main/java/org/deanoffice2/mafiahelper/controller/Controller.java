package org.deanoffice2.mafiahelper.controller;

import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {

    @Autowired
    @Qualifier("gameService")
    private GameService gameService;

    @PutMapping("/game-end")
    public ResponseEntity saveGameResult(@RequestBody GameResult gameResult) {
        gameService.saveGameResults(gameResult);
        return ResponseEntity.ok("Success");
    }
}
