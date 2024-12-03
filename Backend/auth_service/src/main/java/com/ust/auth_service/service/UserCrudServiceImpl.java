package com.ust.auth_service.service;

import com.ust.auth_service.dto.UserDtoResponse;
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

    @Override
    public UserDtoResponse saveUser(UserModel user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        var savedUser = userRepository.save(user);
        return new UserDtoResponse(savedUser.getUsername(), savedUser.getRole());
    }
}
