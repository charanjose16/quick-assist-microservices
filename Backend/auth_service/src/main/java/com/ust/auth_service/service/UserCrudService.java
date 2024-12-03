package com.ust.auth_service.service;

import com.ust.auth_service.dto.UserDtoResponse;
import com.ust.auth_service.model.UserModel;

public interface UserCrudService {

    public UserDtoResponse saveUser(UserModel user);
}
