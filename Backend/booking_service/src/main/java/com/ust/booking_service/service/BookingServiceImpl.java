package com.ust.booking_service.service;

import com.ust.booking_service.enums.BookingStatus;
import com.ust.booking_service.model.Booking;
import com.ust.booking_service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl{

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking bookingDTO) {
//        Booking booking=bookingDTO.convertToEntity();
//        Booking savedBooking=bookingRepository.save(booking);
//        return BookingDTO.convertToDTO(savedBooking);
        return bookingRepository.save(bookingDTO);
    }

    public Booking findBookingById(int id) {

        return bookingRepository.findById(id).orElse(null);
    }

    public List<Booking> findAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking updateBooking(int id, Booking booking) {
        Booking updatedBooking=bookingRepository.findById(id).orElse(null);
        return bookingRepository.save(updatedBooking);
    }

    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);

    }

    public Booking updateBookingStatus(int id, BookingStatus bookingStatus){
        Booking booking=bookingRepository.findById(id).orElse(null);
        booking.setBookingStatus(bookingStatus);
        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(int userId) {
        return bookingRepository.findAllByUserId(userId);
    }

    public List<Booking> getWorkerBookings(int userId) {
        return bookingRepository.findAllByWorkerId(userId);
    }

    public void updateWorkerReview(int bookingId, String review) {
        // Find the service request by ID
        Booking booking = bookingRepository.findById(bookingId).orElse(null);

        if (booking == null) {
            throw new IllegalArgumentException("Service request not found with ID: " + bookingId);
        }

        // Update the review and rating
        booking.setReview(review);

        // Save and return the updated service request
         bookingRepository.save(booking);
    }

    public String getReviewById(int bookingId) {
        return bookingRepository.findById(bookingId)
                .map(Booking::getReview)
                .orElse(""); // Return empty string if no review exists
    }

    public List<String> getReviewsByWorkerId(int workerId){
        return bookingRepository.findReviewsByWorkerId(workerId);
    }


    public Booking getBookingByUser(int userId) {
        return bookingRepository.findByUserId(userId);
    }
}
