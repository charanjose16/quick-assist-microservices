package com.ust.auth_service.dto;

import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Data
public class WorkerSignupDto {

    private int id;
    private String name;
    private String username;
    private String password;
    private String phoneNumber;
    private String role;
    private String email;
    private String city;
    private String expertise;
    private List<String> specialities;
}
