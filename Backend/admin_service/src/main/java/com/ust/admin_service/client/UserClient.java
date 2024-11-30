package com.ust.admin_service.client;

import com.ust.admin_service.dto.UserModel;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {

    @GetMapping("/users/all")
    List<UserModel> getAllUserModel();
}
