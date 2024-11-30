package com.ust.booking_service.model;

import com.ust.booking_service.enums.ServiceStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequest {

    @Id
    private int id;
    private ServiceStatus serviceStatus;
    private int userId;
    private int workerId;
    private int paymentId;
}
