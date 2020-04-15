package org.deanoffice2.mafiahelper.controller;

import org.deanoffice2.mafiahelper.service.StaticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaticDataController {

    @Autowired
    @Qualifier(value="staticService")
    private StaticService staticService;

    @GetMapping("/create-game/")
    public ResponseEntity getRolesForGame() {
        return ResponseEntity.ok(staticService.getRoles());
    }
}
