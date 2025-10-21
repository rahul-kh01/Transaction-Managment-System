package com.zosh.service.impl;


import com.zosh.exception.ResourceNotFoundException;
import com.zosh.exception.UserException;
import com.zosh.modal.Customer;
import com.zosh.modal.User;
import com.zosh.repository.CustomerRepository;
import com.zosh.service.CustomerService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final UserService userService;

    @Override
    public Customer createCustomer(Customer customer) {
        // ✅ NEW: Set store from current user if not set
        if (customer.getStore() == null) {
            try {
                User currentUser = userService.getCurrentUser();
                customer.setStore(currentUser.getStore());
            } catch (UserException e) {
                throw new RuntimeException("Cannot determine store for customer", e);
            }
        }
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customerData) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Customer not found with id " + id));

        customer.setFullName(customerData.getFullName());
        customer.setEmail(customerData.getEmail());
        customer.setPhone(customerData.getPhone());

        return customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(Long id) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + id));
        customerRepository.delete(customer);
    }

    @Override
    public Customer getCustomerById(Long id) throws ResourceNotFoundException {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + id));
    }

    // ❌ DEPRECATED: No store filtering - use getAllCustomersByStore instead
    @Override
    @Deprecated
    public List<Customer> getAllCustomers() {
        // For backward compatibility, get from current user's store
        try {
            User currentUser = userService.getCurrentUser();
            return customerRepository.findByStoreId(currentUser.getStore().getId());
        } catch (UserException e) {
            return customerRepository.findAll(); // Fallback
        }
    }
    
    // ✅ NEW: Multi-tenant safe method
    @Override
    public List<Customer> getAllCustomersByStore(Long storeId) {
        return customerRepository.findByStoreId(storeId);
    }

    // ❌ DEPRECATED: No store filtering - use searchCustomerByStore instead
    @Override
    @Deprecated
    public List<Customer> searchCustomer(String keyword) {
        // For backward compatibility, search within current user's store
        try {
            User currentUser = userService.getCurrentUser();
            return customerRepository.searchByStoreId(currentUser.getStore().getId(), keyword);
        } catch (UserException e) {
            return customerRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
        }
    }
    
    // ✅ NEW: Multi-tenant safe search
    @Override
    public List<Customer> searchCustomerByStore(String keyword, Long storeId) {
        return customerRepository.searchByStoreId(storeId, keyword);
    }

}
