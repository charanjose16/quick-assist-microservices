package com.ust.booking_service.api;

import com.ust.booking_service.dto.BookingDTO;
import com.ust.booking_service.enums.BookingStatus;
import com.ust.booking_service.model.Booking;
import com.ust.booking_service.service.BookingServiceImpl;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingServiceImpl bookingService;

    @PostMapping("/createBooking")
    public Booking createBooking(@RequestBody Booking booking){
        return bookingService.createBooking(booking);
    }

    @PutMapping("/status/{id}/{bookingStatus}")
    public void updateBookingStatus(@PathVariable int id,@PathVariable BookingStatus bookingStatus) {
         bookingService.updateBookingStatus(id, bookingStatus);
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable int id){
        return bookingService.findBookingById(id);
    }

    @GetMapping
    public List<Booking> getAllBookings(){

        return bookingService.findAllBookings();
    }

    @GetMapping("/user/{id}")
    public List<Booking> getBookingsUser(@PathVariable int id){
        return bookingService.getUserBookings(id);
    }

    @GetMapping("/worker/{id}")
    public List<Booking> getBookingsWorker(@PathVariable int id){
        return bookingService.getWorkerBookings(id);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable int id,@RequestBody Booking booking){
      return  bookingService.updateBooking(id,booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable int id){
        bookingService.deleteBooking(id);
    }


    @PostMapping("/addReview")
    public void addReview(@RequestBody ReviewPayload payload) {
        bookingService.updateWorkerReview(payload.getBookingId(), payload.getReview());
    }

    @GetMapping("/getReviewById/{id}")
    public ResponseEntity<String> getReviewById(@PathVariable int id) {
        String review = bookingService.getReviewById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .body(review);
    }



    @GetMapping("/reviews/{workerId}")
    public List<String> getReviewsByWorkerId(@PathVariable int workerId) {
        return bookingService.getReviewsByWorkerId(workerId);
    }

    @GetMapping("/BookingByUserId/{userId}")
    public Booking getBookingByUserId(@PathVariable int userId){
        return bookingService.getBookingByUser(userId);
    }


}
