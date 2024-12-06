package com.ust.booking_service.model;

import com.ust.booking_service.enums.BookingStatus;
import com.ust.booking_service.enums.PaymentMethod;
import com.ust.booking_service.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

  @Id
  private int id;
  private double amount;
  @Enumerated(EnumType.STRING)
  private PaymentStatus paymentStatus;
  @Enumerated(EnumType.STRING)
  private PaymentMethod paymentMethod;


}
