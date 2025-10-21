package com.zosh.service;


import com.zosh.exception.ResourceNotFoundException;
import com.zosh.modal.Customer;

import java.util.List;

public interface CustomerService {

    Customer createCustomer(Customer customer);

    Customer updateCustomer(Long id, Customer customer) throws ResourceNotFoundException;

    void deleteCustomer(Long id) throws ResourceNotFoundException;

    Customer getCustomerById(Long id) throws ResourceNotFoundException;

    // ❌ DEPRECATED: No store filtering - security risk
    @Deprecated
    List<Customer> getAllCustomers();
    
    // ✅ NEW: Store-scoped queries for multi-tenant security
    List<Customer> getAllCustomersByStore(Long storeId);

    // ❌ DEPRECATED: No store filtering - security risk
    @Deprecated
    List<Customer> searchCustomer(String keyword);
    
    // ✅ NEW: Store-scoped search
    List<Customer> searchCustomerByStore(String keyword, Long storeId);

}

