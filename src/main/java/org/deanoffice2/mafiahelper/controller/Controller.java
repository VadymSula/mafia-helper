package org.deanoffice2.mafiahelper.controller;

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

    @GetMapping("/games/player-game-result{idGame}")
    public ResponseEntity getPlayersGame(@PathVariable int idGame) {
        return ResponseEntity.ok(gameService.findGameById(idGame));
    }
}
