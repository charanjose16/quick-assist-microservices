package com.ust.user_service.service;

import com.ust.user_service.model.UserModel;
import com.ust.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;



    public UserModel createUser(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel findUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<UserModel> getAllUserModel() {
        return userRepository.findAll();
    }

    public UserModel updateUser(int id, UserModel userModel) {
        UserModel user=userRepository.findById(id).orElse(null);
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
