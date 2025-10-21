package com.zosh.service;


import com.zosh.exception.UserException;
import com.zosh.payload.dto.InventoryDTO;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface InventoryService {
    InventoryDTO createInventory(InventoryDTO dto) throws AccessDeniedException, UserException;
    InventoryDTO updateInventory(Long id, InventoryDTO dto) throws AccessDeniedException, UserException;
    void deleteInventory(Long id) throws AccessDeniedException, UserException;
    InventoryDTO getInventoryById(Long id);
    
    // ✅ FIXED: Return List instead of single DTO (one product can be in multiple branches)
    List<InventoryDTO> getInventoryByProductId(Long productId);
    
    // ✅ NEW: Get inventory for specific branch and product
    InventoryDTO getInventoryByBranchAndProduct(Long branchId, Long productId);
    
    List<InventoryDTO> getInventoryByBranch(Long branchId);

}

