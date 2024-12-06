package com.ust.booking_service.repository;

import com.ust.booking_service.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Integer> {

    public Payment findByServiceId(int serviceId);
}
