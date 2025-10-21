package com.zosh.service.impl;


import com.zosh.exception.UserException;
import com.zosh.mapper.InventoryMapper;
import com.zosh.modal.Branch;
import com.zosh.modal.Inventory;
import com.zosh.modal.Product;
import com.zosh.payload.dto.InventoryDTO;
import com.zosh.repository.BranchRepository;
import com.zosh.repository.InventoryRepository;
import com.zosh.repository.ProductRepository;
import com.zosh.util.SecurityUtil;
import com.zosh.service.InventoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final BranchRepository branchRepository;
    private final ProductRepository productRepository;
    private final SecurityUtil securityUtil;

    @Override
    public InventoryDTO createInventory(InventoryDTO dto) throws AccessDeniedException, UserException {
        Branch branch = branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new EntityNotFoundException("Branch not found"));
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

//        securityUtil.checkAuthority(branch);

        // ✅ NEW: Check for existing inventory (unique constraint)
        if (inventoryRepository.existsByBranchIdAndProductId(dto.getBranchId(), dto.getProductId())) {
            throw new IllegalArgumentException(
                "Inventory already exists for this product in this branch. Use update instead."
            );
        }

        Inventory inventory = InventoryMapper.toEntity(dto, branch, product);
        return InventoryMapper.toDto(inventoryRepository.save(inventory));
    }

    @Override
    public InventoryDTO updateInventory(Long id, InventoryDTO dto) throws AccessDeniedException, UserException {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));

//        securityUtil.checkAuthority(inventory);

        inventory.setQuantity(dto.getQuantity());
        return InventoryMapper.toDto(inventoryRepository.save(inventory));
    }

    @Override
    public void deleteInventory(Long id) throws AccessDeniedException, UserException {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));

        securityUtil.checkAuthority(inventory);

        inventoryRepository.delete(inventory);
    }

    @Override
    public InventoryDTO getInventoryById(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));

        return InventoryMapper.toDto(inventory);
    }

    @Override
    public List<InventoryDTO> getInventoryByBranch(Long branchId) {
        return inventoryRepository.findByBranchId(branchId)
                .stream()
                .map(InventoryMapper::toDto)
                .collect(Collectors.toList());
    }

    // ✅ FIXED: Return List (one product can be in multiple branches)
    @Override
    public List<InventoryDTO> getInventoryByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .stream()
                .map(InventoryMapper::toDto)
                .collect(Collectors.toList());
    }
    
    // ✅ NEW: Get inventory for specific branch and product
    @Override
    public InventoryDTO getInventoryByBranchAndProduct(Long branchId, Long productId) {
        return inventoryRepository.findByBranchIdAndProductId(branchId, productId)
                .map(InventoryMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException(
                    "Inventory not found for product " + productId + " in branch " + branchId
                ));
    }
}

