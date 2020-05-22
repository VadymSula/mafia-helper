package org.deanoffice2.mafiahelper.controller;

import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.deanoffice2.mafiahelper.entity.RatingGame;
import org.deanoffice2.mafiahelper.service.GameService;
import org.deanoffice2.mafiahelper.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GameController {

    @Autowired
    @Qualifier("gameService")
    private GameService gameService;
    @Autowired
    @Qualifier("ratingService")
    private RatingService ratingService;

    @PutMapping("/game-end")
    public ResponseEntity<HttpStatus> saveGameResult(@RequestBody GameResult gameResult) {
        gameService.saveGameResults(gameResult);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/game-end/id-game={idGame}")
    public ResponseEntity<GameResult> getGameResult(@PathVariable("idGame") Integer idGame) {
        return new ResponseEntity<>(
                gameService.getGameResults(idGame),
                HttpStatus.OK
        );
    }

    @GetMapping("/games/id-game={idGame}/players/id-player={idPlayer}")
    public ResponseEntity<PlayerResult> getPlayerResultsById(
            @PathVariable Integer idGame,
            @PathVariable Integer idPlayer) {
        return new ResponseEntity<>(
                gameService.getPlayerResultByIdAndGameId(idGame, idPlayer),
                HttpStatus.OK
        );
    }

    @PostMapping("/rating-game/game-end/mp")
    public ResponseEntity<HttpStatus> calcRating(@RequestBody GameResult gameResult) {
        ratingService.updateRatingForMajorPoints(gameResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/rating-game/game-end/ep")
    public ResponseEntity<HttpStatus> calcRating(@RequestBody List<RatingGame> ratingList) {
        ratingService.updateRatingForExtraPoints(ratingList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
