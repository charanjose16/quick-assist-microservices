package com.ust.auth_service.api;

import com.ust.auth_service.client.UserServiceClient;
import com.ust.auth_service.dto.*;
import com.ust.auth_service.service.AuthenticationService;
import com.ust.auth_service.service.UserCrudServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
//@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserCrudServiceImpl userCrudService;

    @Autowired
    private UserServiceClient userServiceClient;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody UserCredentials userCredentials) {
        return authenticationService.authenticate(userCredentials);
    }
////
//    @PostMapping("/workerLogin")
//    public Map<String, Object> workerLogin(@RequestBody UserCredentials userCredentials) {
//        return authenticationService.authenticate(userCredentials);
//    }

    @PostMapping("/validate")
    public void validateToken(@RequestParam("token") String token) {
//        log.info("aagya token");
        authenticationService.validateToken(token);
    }

    @PostMapping("/signup")
    public UserSignupDto signup(@RequestBody UserSignupDto user) {
        return userCrudService.saveUser(user);
    }

//    @PostMapping("/workerSignup")
//    public WorkerSignupDto signup(@RequestBody WorkerSignupDto worker) {
//        return userCrudService.saveWorker(worker);
//    }

    @PostMapping("/logout")
    public void logout() {
        authenticationService.logout();
    }
}
