package com.ust.booking_service.repository;

import com.ust.booking_service.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Integer> {
    
    List<Booking> findAllByUserId(int userId);

    List<Booking> findAllByWorkerId(int userId);

    @Query("SELECT b.review FROM Booking b WHERE b.workerId = :workerId AND b.review IS NOT NULL AND b.review <> ''")
    List<String> findReviewsByWorkerId(int workerId);

    Booking findByUserId(int userId);
}
