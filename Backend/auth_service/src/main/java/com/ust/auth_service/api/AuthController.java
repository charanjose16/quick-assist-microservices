package com.ust.auth_service.api;

import com.ust.auth_service.dto.JwtToken;
import com.ust.auth_service.dto.UserCredentials;
import com.ust.auth_service.dto.UserDtoResponse;
import com.ust.auth_service.model.UserModel;
import com.ust.auth_service.service.AuthenticationService;
import com.ust.auth_service.service.UserCrudService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserCrudService userCrudService;

    @PostMapping("/login")
    public JwtToken login(@RequestBody UserCredentials userCredentials) {
        return authenticationService.authenticate(userCredentials);
    }

    @PostMapping("/validate")
    public void validateToken(@RequestBody String token) {
        authenticationService.validateToken(token);
    }

    @PostMapping("/signup")
    public UserDtoResponse signup(@RequestBody UserModel user) {
//        log.info("registered");
        return userCrudService.saveUser(user);
    }

    @PostMapping("/logout")
    public void logout() {
        authenticationService.logout();
    }
}
