package com.ust.booking_service.dto;

import com.ust.booking_service.enums.PaymentMethod;
import com.ust.booking_service.enums.PaymentStatus;
import com.ust.booking_service.model.Payment;
import lombok.Data;

@Data
public class PaymentDTO {
    private int id;
    private double amount;
    private PaymentStatus paymentStatus;
    private PaymentMethod paymentMethod;

    public Payment convertToEntity() {
        Payment payment = new Payment();
        payment.setId(this.id);
        payment.setAmount(this.amount);
        payment.setPaymentStatus(this.paymentStatus);
        payment.setPaymentMethod(this.paymentMethod);
        return payment;
    }


    public static PaymentDTO convertToDTO(Payment payment) {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setId(payment.getId());
        paymentDTO.setAmount(payment.getAmount());
        paymentDTO.setPaymentStatus(payment.getPaymentStatus());
        paymentDTO.setPaymentMethod(payment.getPaymentMethod());
        return paymentDTO;
    }
}
