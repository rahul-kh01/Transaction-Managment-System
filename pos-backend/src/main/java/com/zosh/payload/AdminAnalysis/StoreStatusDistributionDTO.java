package com.zosh.payload.AdminAnalysis;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreStatusDistributionDTO {
    private Long active;
    private Long blocked;
    private Long pending;
}
