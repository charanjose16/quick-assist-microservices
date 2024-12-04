package com.ust.auth_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserSignupDto {

    private int id;
    private String name;
    private String username;
    private String password;
    private String role;
    private String phoneNumber;
    private String email;
    private String address;
    private String city;
    private String expertise;
    private List<String> specialities;
}
