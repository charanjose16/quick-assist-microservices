package com.ust.user_service.repository;

import com.ust.user_service.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserModel,Integer> {

    public UserModel findByUsername(String username);


    public List<UserModel> findAllByRoleAndExpertise(String role,String expertise);


}
