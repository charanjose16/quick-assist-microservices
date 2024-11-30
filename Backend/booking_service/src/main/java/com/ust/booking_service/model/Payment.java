package com.ust.booking_service.model;

import com.ust.booking_service.enums.BookingStatus;
import com.ust.booking_service.enums.PaymentMethod;
import com.ust.booking_service.enums.PaymentStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
  private PaymentStatus paymentStatus;
  private PaymentMethod paymentMethod;


}
