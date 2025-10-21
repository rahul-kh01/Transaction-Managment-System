package com.zosh.payload.dto;
import com.zosh.modal.Branch;
import jakarta.persistence.ElementCollection;
import lombok.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchDTO {
    private Long id;
    private String name;
    private String address;
    private String email;
    private String phone;
    private List<String> workingDays;
    private LocalTime openTime;
    private LocalTime closeTime;
    private Long storeId;
    private StoreDTO store;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String manager;

    public BranchDTO(Long id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}

