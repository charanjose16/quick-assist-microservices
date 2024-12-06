package com.ust.booking_service.api;

import com.ust.booking_service.enums.PaymentStatus;
import com.ust.booking_service.model.Payment;
import com.ust.booking_service.service.PaymentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentServiceImpl paymentService;

    @PostMapping("/createPayment")
    public Payment createPayment(@RequestBody  Payment payment){
        return paymentService.createPayment(payment);
    }

    @GetMapping("/getPayment/{paymentId}")
    public Payment getPaymentById(@PathVariable int paymentId){
        return paymentService.getPaymentById(paymentId);
    }

    @PutMapping("/updatePayStatus/{paymentId}/{paymentStatus}")
    public void updatePaymentStatus(@PathVariable int paymentId, PaymentStatus paymentStatus){
        paymentService.updatePaymentStatus(paymentId,paymentStatus);
    }

    @GetMapping("/getPaymentByServiceId/{serviceId}")
    public Payment getPaymentByServiceId(@PathVariable int serviceId){
        return paymentService.getByServiceId(serviceId);
    }
}
