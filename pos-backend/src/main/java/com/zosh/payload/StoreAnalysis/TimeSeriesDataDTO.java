package com.zosh.payload.StoreAnalysis;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TimeSeriesDataDTO {
    private List<TimeSeriesPointDTO> points;
    private String period; // DAILY, WEEKLY, MONTHLY
}
