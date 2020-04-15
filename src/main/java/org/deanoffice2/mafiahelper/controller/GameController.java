package org.deanoffice2.mafiahelper.controller;

import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class GameController {

    @Autowired
    @Qualifier("gameService")
    private GameService gameService;

    @PutMapping("/game-end/id-game={idGame}")
    public ResponseEntity saveGameResult(@RequestBody GameResult gameResult) {
        gameService.saveGameResults(gameResult);
        return ResponseEntity
                .ok("Success");
    }

    @GetMapping("/game-end/id-game={idGame}")
    public ResponseEntity getGameResult(@PathVariable("idGame") int idGame) {
        return ResponseEntity
                .ok(gameService.getGameResults(idGame));
    }

    @GetMapping("/games/id-game={idGame}/players/id-player={idPlayer}")
    public ResponseEntity getPlayerResultsById(@PathVariable Integer idGame, @PathVariable Integer idPlayer) {
        return ResponseEntity
                .ok(gameService.getPlayerResultByIdAndGameId(idPlayer, idGame));
    }
}
