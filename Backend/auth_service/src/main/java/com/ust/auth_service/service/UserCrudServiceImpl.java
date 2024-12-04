package com.ust.auth_service.service;

import com.ust.auth_service.client.UserServiceClient;
import com.ust.auth_service.client.WorkerServiceClient;
import com.ust.auth_service.dto.UserSignupDto;
import com.ust.auth_service.dto.WorkerSignupDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCrudServiceImpl implements UserCrudService{


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private WorkerServiceClient workerServiceClient;

    public UserSignupDto saveUser(UserSignupDto user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userServiceClient.createUser(user);
    }

//    public WorkerSignupDto saveWorker(WorkerSignupDto worker) {
//        String encodedPassword = passwordEncoder.encode(worker.getPassword());
//        worker.setPassword(encodedPassword);
//        return workerServiceClient.createWorker(worker);
//    }


}
