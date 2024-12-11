package com.ust.user_service.service;

import com.ust.user_service.model.UserModel;
import com.ust.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public UserModel findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<UserModel> getAllUserModel() {
        return userRepository.findAll();
    }

    public UserModel updateUser(int id, UserModel updatedUser) {

        UserModel existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update only non-null fields
        if (updatedUser.getName() != null && !updatedUser.getName().isEmpty()) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPhoneNumber() != null && !updatedUser.getPhoneNumber().isEmpty()) {
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        }
        if(updatedUser.getPrice() != null && !updatedUser.getCity().isEmpty()) {
            existingUser.setPrice(updatedUser.getPrice());
        }
        if (updatedUser.getCity() != null && !updatedUser.getCity().isEmpty()) {
            existingUser.setCity(updatedUser.getCity());
        }

        // Add other fields as needed

        return userRepository.save(existingUser);
    }



    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public List<UserModel> getAllWorkers(String expertise){
        return userRepository.findAllByRoleAndExpertise("WORKER",expertise);
    }
}
