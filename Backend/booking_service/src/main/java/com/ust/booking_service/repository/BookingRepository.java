package com.ust.booking_service.repository;

import com.ust.booking_service.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Integer> {
    
    List<Booking> findAllByUserId(int userId);

    List<Booking> findAllByWorkerId(int userId);
}
