package org.deanoffice2.mafiahelper.controller;

import org.deanoffice2.mafiahelper.entity.Player;
import org.deanoffice2.mafiahelper.entity.RoleGame;
import org.deanoffice2.mafiahelper.service.StaticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
public class StaticDataController {

    @Autowired
    @Qualifier(value = "staticService")
    private StaticService staticService;

    @GetMapping("/create-game/")
    public ResponseEntity<List<RoleGame>> getRolesForGame() {
        return new ResponseEntity<>(
                staticService.getRoles(),
                HttpStatus.OK
        );
    }

    @PutMapping("/create-game/")
    public ResponseEntity<HttpStatus> addNewPlayer(@RequestBody String playerNickName) {
        staticService.addNewPlayer(playerNickName);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @GetMapping("/create-game/select-player")
    public ResponseEntity<List<Player>> getPlayersNicknames() {
        return new ResponseEntity<>(
                staticService.getPlayersNicknames(),
                HttpStatus.OK
        );
    }
}
