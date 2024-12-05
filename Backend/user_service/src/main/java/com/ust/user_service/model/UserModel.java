package com.ust.user_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
//    unique user name to be implemented
    private String username;
    private String password;
    private String role;
    private String phoneNumber;
    private String email;
    private String address;
    private String city;
    private Integer price;
    private String expertise;
    private List<String> specialities;

}
