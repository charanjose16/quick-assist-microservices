package com.ust.auth_service.service;

import com.ust.auth_service.client.UserServiceClient;
import com.ust.auth_service.dto.UserDtoResponse;
import com.ust.auth_service.dto.UserSignupDto;
import com.ust.auth_service.model.UserModel;
import com.ust.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCrudServiceImpl implements UserCrudService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceClient userServiceClient;

    public UserSignupDto saveUser(UserSignupDto user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return userServiceClient.createUser(user);
    }
}
