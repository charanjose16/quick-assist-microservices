package com.ust.booking_service.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ust.booking_service.enums.BookingStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

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
//    @JsonFormat(pattern = "yyyy-MM-dd")
    private String date;
//    @JsonFormat(pattern = "hh:mm:ss")
    private String time;
    private int serviceId;
    private int paymentId;
}
