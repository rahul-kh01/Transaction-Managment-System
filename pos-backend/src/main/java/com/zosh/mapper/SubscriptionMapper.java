package com.zosh.mapper;


import com.zosh.modal.Subscription;
import com.zosh.payload.dto.SubscriptionDTO;

public class SubscriptionMapper {

    public static SubscriptionDTO toDto(Subscription sub) {
        return SubscriptionDTO.builder()
                .id(sub.getId())
                .storeId(sub.getStore().getId())
                .storeName(sub.getStore().getBrand())
                .planName(sub.getPlan().getName())
                .startDate(sub.getStartDate())
                .endDate(sub.getEndDate())
                .status(sub.getStatus())
                .paymentStatus(sub.getPaymentStatus())
                .paymentGateway(sub.getPaymentGateway())
                .transactionId(sub.getTransactionId())
                .createdAt(sub.getCreatedAt())
                .updatedAt(sub.getUpdatedAt())
                .build();
    }
}
