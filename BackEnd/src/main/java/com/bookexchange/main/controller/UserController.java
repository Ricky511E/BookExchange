package com.bookexchange.main.controller;

import com.bookexchange.main.model.User;
import com.bookexchange.main.repository.UserRepository;
import com.bookexchange.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Esiste già un account con questa mail");
        }
        else {
            userService.saveUser(user);
            userService.sendToken(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("Utente creato, controlla la console per confermare.");
        }
    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmUser(@RequestParam("token") String token) {
        String result = userService.confirmUser(token);
        return ResponseEntity.ok(result);
    }
}
