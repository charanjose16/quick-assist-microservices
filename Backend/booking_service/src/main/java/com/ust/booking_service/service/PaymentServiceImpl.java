package com.ust.booking_service.service;

import com.ust.booking_service.enums.PaymentStatus;
import com.ust.booking_service.model.Payment;
import com.ust.booking_service.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment createPayment(Payment payment){
       return paymentRepository.save(payment);
    }

    public Payment getPaymentById(int paymentId){
        return paymentRepository.findById(paymentId).orElse(null);
    }

    public void updatePaymentStatus(int paymentId, PaymentStatus paymentStatus){
        Payment payment=paymentRepository.findById(paymentId).orElse(null);
        payment.setPaymentStatus(paymentStatus);
        paymentRepository.save(payment);
    }

    public Payment getByServiceId(int serviceId){
        return paymentRepository.findByServiceId(serviceId);
    }



}
