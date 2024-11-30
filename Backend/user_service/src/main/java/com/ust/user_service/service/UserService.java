package com.ust.user_service.service;

import com.ust.user_service.model.UserModel;

import java.util.List;

public interface UserService {
    public UserModel createUser(UserModel userModel);
    public UserModel findUserById(int id);
    public List<UserModel> getAllUserModel();
    public UserModel updateUser(int id,UserModel userModel);
    public void deleteUser(int id);

}
