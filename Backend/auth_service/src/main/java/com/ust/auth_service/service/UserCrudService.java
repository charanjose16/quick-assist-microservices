package com.ust.auth_service.service;

import com.ust.auth_service.dto.UserSignupDto;

public interface UserCrudService {

    public UserSignupDto saveUser(UserSignupDto user);

}
