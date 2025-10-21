package com.zosh.controller;

import com.zosh.exception.ResourceNotFoundException;
import com.zosh.modal.Customer;
import com.zosh.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customer> create(
            @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.createCustomer(customer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> update(
            @PathVariable Long id,
            @RequestBody Customer customer
    ) throws ResourceNotFoundException {
        return ResponseEntity.ok(customerService.updateCustomer(id, customer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id
    ) throws ResourceNotFoundException {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getById(
            @PathVariable Long id
    ) throws ResourceNotFoundException {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    // ⚠️ DEPRECATED: Use /store/{storeId} endpoint instead
    @GetMapping
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }
    
    // ✅ NEW: Get customers by store (multi-tenant safe)
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<Customer>> getAllByStore(@PathVariable Long storeId) {
        return ResponseEntity.ok(customerService.getAllCustomersByStore(storeId));
    }
    
    // ✅ NEW: Search customers by store (multi-tenant safe)
    @GetMapping("/store/{storeId}/search")
    public ResponseEntity<List<Customer>> searchByStore(
            @PathVariable Long storeId,
            @RequestParam String keyword) {
        return ResponseEntity.ok(customerService.searchCustomerByStore(keyword, storeId));
    }


}
