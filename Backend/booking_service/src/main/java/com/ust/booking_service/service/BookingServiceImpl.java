package com.ust.booking_service.service;

import com.ust.booking_service.dto.BookingDTO;
import com.ust.booking_service.enums.BookingStatus;
import com.ust.booking_service.model.Booking;
import com.ust.booking_service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service
public class BookingServiceImpl{

    @Autowired
    private BookingRepository bookingRepository;

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking=bookingDTO.convertToEntity();
        Booking savedBooking=bookingRepository.save(booking);
        return BookingDTO.convertToDTO(savedBooking);
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
}
