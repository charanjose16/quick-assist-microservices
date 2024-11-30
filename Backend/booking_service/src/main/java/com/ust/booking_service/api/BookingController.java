package com.ust.booking_service.api;

import com.ust.booking_service.dto.BookingDTO;
import com.ust.booking_service.model.Booking;
import com.ust.booking_service.service.BookingServiceImpl;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingServiceImpl bookingService;

    @PostMapping
    public BookingDTO createBooking(@RequestBody BookingDTO booking){
        return bookingService.createBooking(booking);
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable int id){
        return bookingService.findBookingById(id);
    }

    @GetMapping
    public List<Booking> getAllBookings(){
        return bookingService.findAllBookings();
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable int id,@RequestBody Booking booking){
      return  bookingService.updateBooking(id,booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable int id){
        bookingService.deleteBooking(id);
    }

}
