package com.ust.worker_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerModel {

    @Id
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
