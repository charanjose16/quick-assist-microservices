package com.ust.auth_service.repository;

import com.ust.auth_service.dto.UserSignupDto;
import com.ust.auth_service.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByUsername(String username);
}
