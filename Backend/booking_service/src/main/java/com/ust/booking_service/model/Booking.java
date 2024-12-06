package com.ust.booking_service.model;

import com.ust.booking_service.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int userId;
    private int workerId;
    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;
    private String review;
    private int serviceId;
    private int paymentId;
}
