package com.zosh.payload.AdminAnalysis;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreRegistrationStatDTO {
    private String date; // formatted as yyyy-MM-dd
    private Long count;
}
