package com.ust.booking_service.api;

import com.ust.booking_service.service.SmsSenderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sms")
public class SmsController {

    private final SmsSenderServiceImpl smsSender;

    @Autowired
    public SmsController(SmsSenderServiceImpl smsSender) {
        this.smsSender = smsSender;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@RequestParam String phoneNumber, @RequestParam String message) {
        try {
            smsSender.sendSms(phoneNumber, message);
            return ResponseEntity.ok("Message sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send SMS: " + e.getMessage());
        }
    }
}
