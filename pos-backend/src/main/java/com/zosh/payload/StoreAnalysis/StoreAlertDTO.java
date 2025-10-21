package com.zosh.payload.StoreAnalysis;

import com.zosh.payload.dto.BranchDTO;
import com.zosh.payload.dto.ProductDTO;
import com.zosh.payload.dto.RefundDTO;
import com.zosh.payload.dto.UserDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StoreAlertDTO {
    private List<ProductDTO> lowStockAlerts;
    private List<BranchDTO> noSalesToday;
    private List<RefundDTO> refundSpikeAlerts;
    private List<UserDTO> inactiveCashiers;
}

