package com.ust.user_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

    @Id
    private int id;
    private String name;
    private String username;
    private String password;
    private String phoneNumber;
    private String email;
    private String address;

}
