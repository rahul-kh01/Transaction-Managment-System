package com.zosh.modal;

import com.zosh.domain.PaymentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentSummary {


    private PaymentType type; // CASH, CARD, UPI

    private Double totalAmount;
    private int transactionCount;
    private double percentage;


}
