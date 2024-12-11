package com.ust.booking_service.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ust.booking_service.enums.ServiceStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Enumerated(EnumType.STRING)
    private ServiceStatus serviceStatus;

    private int userId;
    private int workerId;
    private int paymentId;


    private LocalDateTime dateTime;
    private String homeAddress;
}
