package com.ust.booking_service.api;

import lombok.Data;

@Data
public class ReviewPayload {
    private int bookingId; // ID of the booking
    private String review; // Review text// Rating out of 5
}
