package com.ust.booking_service.dto;

import com.ust.booking_service.enums.BookingStatus;
import com.ust.booking_service.model.Booking;
import lombok.Data;

@Data
public class BookingDTO {

    private int id;
    private int userId;
    private int workerId;
    private BookingStatus bookingStatus;
//    private String review;
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
