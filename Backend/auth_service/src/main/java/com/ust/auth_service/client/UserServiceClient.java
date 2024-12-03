package com.ust.auth_service.client;

import com.ust.auth_service.dto.UserSignupDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "USER-SERVICE")
public interface UserServiceClient {

    @PostMapping("/users")
    UserSignupDto createUser(UserSignupDto userSignupDto);
}
