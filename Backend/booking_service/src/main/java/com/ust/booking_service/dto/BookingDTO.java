package com.ust.booking_service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ust.booking_service.enums.BookingStatus;
import com.ust.booking_service.model.Booking;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingDTO {

    private int id;
    private int userId;
    private int workerId;
    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;
    private String review;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @JsonFormat(pattern = "hh:mm:ss")
    private LocalTime time;
    private int serviceId;
    private int paymentId;

    public Booking convertToEntity() {
        Booking booking = new Booking();
        booking.setId(this.id);
        booking.setUserId(this.userId);
        booking.setWorkerId(this.workerId);
        booking.setBookingStatus(this.bookingStatus);
//        booking.setReview(this.review);
        booking.setServiceId(this.serviceId);
        booking.setPaymentId(this.paymentId);
        return booking;
    }


    public static BookingDTO convertToDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setUserId(booking.getUserId());
        bookingDTO.setWorkerId(booking.getWorkerId());
        bookingDTO.setBookingStatus(booking.getBookingStatus());
//        bookingDTO.setReview(booking.getReview());
        bookingDTO.setServiceId(bookingDTO.serviceId);
        bookingDTO.setPaymentId(bookingDTO.paymentId);
        return bookingDTO;
    }
}
