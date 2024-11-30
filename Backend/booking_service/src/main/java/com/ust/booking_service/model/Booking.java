package com.ust.booking_service.model;

import com.ust.booking_service.enums.BookingStatus;
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
public class Booking {

    @Id
    private int id;
    private int userId;
    private int workerId;
    private BookingStatus bookingStatus;
    private String review;
    private int serviceId;
    private int paymentId;
}
