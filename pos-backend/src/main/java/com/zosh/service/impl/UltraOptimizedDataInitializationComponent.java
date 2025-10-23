package com.zosh.service.impl;

import com.zosh.domain.*;
import com.zosh.modal.*;
import com.zosh.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class UltraOptimizedDataInitializationComponent implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SubscriptionPlanRepository subscriptionPlanRepository;
    private final StoreRepository storeRepository;
    private final BranchRepository branchRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ShiftReportRepository shiftReportRepository;
    private final RefundRepository refundRepository;
    private final SubscriptionRepository subscriptionRepository;

    private final Random random = new Random();
    private static final int BATCH_SIZE = 25; // Smaller batches
    private static final int MAX_ORDERS_PER_DAY = 10; // Much reduced
    private static final int MAX_DAYS = 7; // Only 7 days of data
    private static final int MAX_PRODUCTS = 5; // Only 5 products per store
    private static final int MAX_CUSTOMERS = 10; // Only 10 customers per store

    @Override
    @Transactional
    public void run(String... args) {
        try {
            log.info("==============================================");
            log.info("Starting ULTRA-OPTIMIZED data initialization...");
            log.info("Memory optimization: Batch size={}, Max orders/day={}, Max days={}", 
                    BATCH_SIZE, MAX_ORDERS_PER_DAY, MAX_DAYS);
            log.info("==============================================");
            
            // Check if data already exists
            long userCount = userRepository.count();
            log.info("Current user count in database: {}", userCount);
            
            if (userCount > 0) {
                log.warn("Data already exists. Skipping initialization.");
                log.info("Found {} users in database", userCount);
                return;
            }

            log.info("Database is empty. Proceeding with ULTRA-OPTIMIZED data initialization...");
            
            // Initialize core data first
            initializeAdminUser();
            initializeSubscriptionPlans();
            
            // Initialize minimal sample data
            initializeUltraOptimizedSampleData();
            
            // Verify data was created
            long finalUserCount = userRepository.count();
            long storeCount = storeRepository.count();
            long productCount = productRepository.count();
            
            log.info("==============================================");
            log.info("ULTRA-OPTIMIZED data initialization completed successfully!");
            log.info("Created {} users", finalUserCount);
            log.info("Created {} stores", storeCount);
            log.info("Created {} products", productCount);
            log.info("==============================================");
            
        } catch (Exception e) {
            log.error("==============================================");
            log.error("FATAL ERROR: Data initialization failed!");
            log.error("Exception: {}", e.getMessage());
            log.error("Stack trace:", e);
            log.error("==============================================");
            throw new RuntimeException("Data initialization failed", e);
        }
    }

    private void initializeAdminUser() {
        String adminUsername = "adminstore@possystem.com";

        if (userRepository.findByEmail(adminUsername) == null) {
            User adminUser = new User();
            adminUser.setPassword(passwordEncoder.encode("codewithzosh"));
            adminUser.setFullName("rahul");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(UserRole.ROLE_ADMIN);
            adminUser.setVerified(true);
            adminUser.setPhone("+1234567890");

            userRepository.save(adminUser);
            log.info("Admin user created successfully");
        }
    }

    private void initializeSubscriptionPlans() {
        if (subscriptionPlanRepository.count() > 0) {
            return;
        }

        List<SubscriptionPlan> plans = Arrays.asList(
            SubscriptionPlan.builder()
                .name("Starter")
                .description("Perfect for small businesses just getting started")
                .price(29.99)
                .billingCycle(BillingCycle.MONTHLY)
                .maxBranches(1)
                .maxUsers(3)
                .maxProducts(100)
                .enableAdvancedReports(false)
                .enableInventory(true)
                .enableIntegrations(false)
                .enableEcommerce(false)
                .enableInvoiceBranding(false)
                .prioritySupport(false)
                .enableMultiLocation(false)
                .extraFeatures(Arrays.asList("Basic reporting", "Email support"))
                .build(),
                
            SubscriptionPlan.builder()
                .name("Professional")
                .description("Ideal for growing businesses with multiple locations")
                .price(79.99)
                .billingCycle(BillingCycle.MONTHLY)
                .maxBranches(5)
                .maxUsers(15)
                .maxProducts(1000)
                .enableAdvancedReports(true)
                .enableInventory(true)
                .enableIntegrations(true)
                .enableEcommerce(true)
                .enableInvoiceBranding(true)
                .prioritySupport(false)
                .enableMultiLocation(true)
                .extraFeatures(Arrays.asList("Advanced analytics", "Priority email support", "API access"))
                .build()
        );

        subscriptionPlanRepository.saveAll(plans);
        log.info("Subscription plans created: {}", plans.size());
    }

    private void initializeUltraOptimizedSampleData() {
        log.info("Creating ULTRA-OPTIMIZED sample stores with minimal data...");
        log.info("Features: 7-day historical data, minimal orders, ultra-memory-optimized processing");
        
        // Get subscription plans
        List<SubscriptionPlan> plans = subscriptionPlanRepository.findAll();
        
        // Create only 2 stores with minimal data
        createUltraOptimizedStore("TechMart Electronics", "Electronics and gadgets retail chain", 
            "Electronics", StoreStatus.ACTIVE, plans.get(1), 1); // Single branch
        
        createUltraOptimizedStore("Fresh Grocery Store", "Your neighborhood grocery store", 
            "Grocery", StoreStatus.ACTIVE, plans.get(0), 1); // Single branch
    }

    private void createUltraOptimizedStore(String brandName, String description, String storeType, 
                            StoreStatus status, SubscriptionPlan plan, int numBranches) {
        
        log.info("Creating ULTRA-OPTIMIZED store: {}", brandName);
        
        // Create Store Admin
        User storeAdmin = new User();
        storeAdmin.setFullName(brandName + " Admin");
        storeAdmin.setEmail(brandName.toLowerCase().replace(" ", "") + "@admin.com");
        storeAdmin.setPassword(passwordEncoder.encode("password123"));
        storeAdmin.setRole(UserRole.ROLE_STORE_ADMIN);
        storeAdmin.setPhone(generatePhoneNumber());
        storeAdmin.setVerified(true);
        storeAdmin = userRepository.save(storeAdmin);
        
        // Create Store
        Store store = Store.builder()
            .brand(brandName)
            .description(description)
            .storeType(storeType)
            .status(status)
            .storeAdmin(storeAdmin)
            .contact(StoreContact.builder()
                .address(generateAddress())
                .phone(generatePhoneNumber())
                .email(brandName.toLowerCase().replace(" ", "") + "@store.com")
                .build())
            .build();
        store = storeRepository.save(store);
        
        // Update store admin with store reference
        storeAdmin.setStore(store);
        userRepository.save(storeAdmin);
        
        // Create Subscription
        LocalDate startDate = LocalDate.now().minusDays(7);
        LocalDate endDate = plan.getBillingCycle() == BillingCycle.MONTHLY 
            ? startDate.plusMonths(1) : startDate.plusYears(1);
            
        Subscription subscription = Subscription.builder()
            .store(store)
            .plan(plan)
            .startDate(startDate)
            .endDate(endDate)
            .status(SubscriptionStatus.ACTIVE)
            .paymentGateway("RAZORPAY")
            .transactionId("TXN_" + UUID.randomUUID().toString().substring(0, 8))
            .paymentStatus(PaymentStatus.SUCCESS)
            .build();
        subscriptionRepository.save(subscription);
        
        // Only create detailed data for ACTIVE stores
        if (status == StoreStatus.ACTIVE) {
            // Create branches
            List<Branch> branches = createUltraOptimizedBranches(store, numBranches);
            
            // Create categories and products
            List<Category> categories = createUltraOptimizedCategories(store, storeType);
            List<Product> products = createUltraOptimizedProducts(store, categories, storeType);
            
            // Create inventory for all branches
            createUltraOptimizedInventory(branches, products);
            
            // Create customers
            List<Customer> customers = createUltraOptimizedCustomers(store, MAX_CUSTOMERS);
            
            // Create cashiers for each branch
            Map<Branch, List<User>> branchCashiers = new HashMap<>();
            for (Branch branch : branches) {
                List<User> cashiers = createUltraOptimizedCashiers(store, branch, 1); // Only 1 cashier
                branchCashiers.put(branch, cashiers);
            }
            
            // Create orders, shift reports, and refunds for the past 7 days
            createUltraOptimizedTransactionData(branches, branchCashiers, products, customers);
        }
        
        log.info("ULTRA-OPTIMIZED store '{}' created with status: {}", brandName, status);
    }

    private List<Branch> createUltraOptimizedBranches(Store store, int count) {
        List<Branch> branches = new ArrayList<>();
        String[] locations = {"Downtown", "Mall"};
        
        for (int i = 0; i < count; i++) {
            // Create Branch Manager
            User manager = new User();
            manager.setFullName(store.getBrand() + " " + locations[i] + " Manager");
            manager.setEmail(store.getBrand().toLowerCase().replace(" ", "") + 
                           "." + locations[i].toLowerCase().replace(" ", "") + "@manager.com");
            manager.setPassword(passwordEncoder.encode("password123"));
            manager.setRole(UserRole.ROLE_BRANCH_MANAGER);
            manager.setStore(store);
            manager.setPhone(generatePhoneNumber());
            manager.setVerified(true);
            manager = userRepository.save(manager);
            
            Branch branch = Branch.builder()
                .name(store.getBrand() + " - " + locations[i])
                .address(generateAddress())
                .phone(generatePhoneNumber())
                .email(locations[i].toLowerCase().replace(" ", "") + "." + 
                      store.getBrand().toLowerCase().replace(" ", "") + "@branch.com")
                .workingDays(Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", 
                                          "FRIDAY", "SATURDAY", "SUNDAY"))
                .openTime(LocalTime.of(9, 0))
                .closeTime(LocalTime.of(21, 0))
                .store(store)
                .manager(manager)
                .build();
            branch = branchRepository.save(branch);
            
            // Update manager with branch reference
            manager.setBranch(branch);
            userRepository.save(manager);
            
            branches.add(branch);
        }
        
        log.info("Created {} ULTRA-OPTIMIZED branches for store: {}", count, store.getBrand());
        return branches;
    }

    private List<Category> createUltraOptimizedCategories(Store store, String storeType) {
        List<Category> categories = new ArrayList<>();
        Map<String, List<String>> categoryMap = new HashMap<>();
        
        categoryMap.put("Electronics", Arrays.asList("Smartphones", "Laptops"));
        categoryMap.put("Grocery", Arrays.asList("Fruits & Vegetables", "Dairy Products"));
        
        List<String> categoryNames = categoryMap.getOrDefault(storeType, 
            Arrays.asList("General", "Electronics"));
        
        for (String categoryName : categoryNames) {
            Category category = Category.builder()
                .name(categoryName)
                .store(store)
                .build();
            categories.add(categoryRepository.save(category));
        }
        
        log.info("Created {} ULTRA-OPTIMIZED categories for store: {}", categories.size(), store.getBrand());
        return categories;
    }

    private List<Product> createUltraOptimizedProducts(Store store, List<Category> categories, String storeType) {
        List<Product> products = new ArrayList<>();
        
        Map<String, List<ProductData>> productDataMap = new HashMap<>();
        
        // Ultra-minimal product sets
        productDataMap.put("Electronics", Arrays.asList(
            new ProductData("iPhone 15 Pro", "Latest Apple smartphone", "Apple", 999.99, 949.99),
            new ProductData("Samsung Galaxy S24", "Flagship Android smartphone", "Samsung", 899.99, 849.99),
            new ProductData("MacBook Pro 14\"", "M3 chip, 16GB RAM", "Apple", 1999.99, 1899.99),
            new ProductData("AirPods Pro", "Active noise cancellation", "Apple", 249.99, 229.99),
            new ProductData("USB-C Cable", "Fast charging cable", "Generic", 19.99, 14.99)
        ));
        
        productDataMap.put("Grocery", Arrays.asList(
            new ProductData("Organic Bananas", "Fresh organic bananas per lb", "Local Farm", 0.99, 0.79),
            new ProductData("Whole Milk", "1 Gallon fresh milk", "Dairy Fresh", 4.99, 4.49),
            new ProductData("White Bread", "Sliced bread loaf", "Wonder", 2.99, 2.49),
            new ProductData("Orange Juice", "100% pure orange juice", "Tropicana", 5.99, 4.99),
            new ProductData("Potato Chips", "Classic flavor", "Lay's", 4.99, 3.99)
        ));
        
        List<ProductData> productDataList = productDataMap.getOrDefault(storeType, 
            productDataMap.get("Electronics"));
        
        // Limit to MAX_PRODUCTS
        int productCount = Math.min(productDataList.size(), MAX_PRODUCTS);
        
        for (int i = 0; i < productCount; i++) {
            ProductData pd = productDataList.get(i);
            Category category = categories.get(i % categories.size());
            
            Product product = Product.builder()
                .name(pd.name)
                .sku(generateSKU(store.getBrand(), i))
                .description(pd.description)
                .mrp(pd.mrp)
                .sellingPrice(pd.sellingPrice)
                .brand(pd.brand)
                .category(category)
                .store(store)
                .build();
            products.add(productRepository.save(product));
        }
        
        log.info("Created {} ULTRA-OPTIMIZED products for store: {}", products.size(), store.getBrand());
        return products;
    }

    private void createUltraOptimizedInventory(List<Branch> branches, List<Product> products) {
        List<Inventory> inventories = new ArrayList<>();
        
        for (Branch branch : branches) {
            for (Product product : products) {
                int quantity = random.nextInt(50) + 10; // Reduced from 100+25
                
                Inventory inventory = Inventory.builder()
                    .branch(branch)
                    .product(product)
                    .quantity(quantity)
                    .build();
                inventories.add(inventory);
            }
        }
        
        inventoryRepository.saveAll(inventories);
        log.info("Created ULTRA-OPTIMIZED inventory for {} branches", branches.size());
    }

    private List<Customer> createUltraOptimizedCustomers(Store store, int count) {
        List<Customer> customers = new ArrayList<>();
        String[] firstNames = {"John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa"};
        String[] lastNames = {"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"};
        
        for (int i = 0; i < count; i++) {
            String firstName = firstNames[random.nextInt(firstNames.length)];
            String lastName = lastNames[random.nextInt(lastNames.length)];
            
            Customer customer = new Customer();
            customer.setFullName(firstName + " " + lastName);
            customer.setEmail(firstName.toLowerCase() + "." + lastName.toLowerCase() + 
                            i + "@customer.com");
            customer.setPhone(generatePhoneNumber());
            customer.setStore(store);
            customers.add(customerRepository.save(customer));
        }
        
        log.info("Created {} ULTRA-OPTIMIZED customers for store: {}", count, store.getBrand());
        return customers;
    }

    private List<User> createUltraOptimizedCashiers(Store store, Branch branch, int count) {
        List<User> cashiers = new ArrayList<>();
        String[] names = {"Alex", "Jordan", "Taylor", "Morgan", "Casey"};
        
        for (int i = 0; i < count; i++) {
            User cashier = new User();
            cashier.setFullName(names[i % names.length] + " " + (i + 1));
            String cleanBranchName = branch.getName().toLowerCase()
                .replaceAll("[^a-z0-9]", "");
            cashier.setEmail(cleanBranchName + ".cashier" + (i + 1) + "@store.com");
            cashier.setPassword(passwordEncoder.encode("password123"));
            cashier.setRole(UserRole.ROLE_BRANCH_CASHIER);
            cashier.setStore(store);
            cashier.setBranch(branch);
            cashier.setPhone(generatePhoneNumber());
            cashier.setVerified(true);
            cashiers.add(userRepository.save(cashier));
        }
        
        log.info("Created {} ULTRA-OPTIMIZED cashiers for branch: {}", count, branch.getName());
        return cashiers;
    }

    private void createUltraOptimizedTransactionData(List<Branch> branches, 
                                             Map<Branch, List<User>> branchCashiers,
                                             List<Product> products,
                                             List<Customer> customers) {
        
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(MAX_DAYS);
        
        log.info("Creating ULTRA-OPTIMIZED transaction data from {} to {} ({} days)", 
                startDate, endDate, MAX_DAYS);
        
        for (Branch branch : branches) {
            List<User> cashiers = branchCashiers.get(branch);
            
            // Create data for each day in batches
            LocalDateTime currentDate = startDate;
            int dayIndex = 0;
            
            while (currentDate.isBefore(endDate)) {
                
                // Calculate growth factor (simulate business growth over time)
                double growthFactor = 1.0 + (dayIndex / (double) MAX_DAYS) * 0.1; // 10% growth
                
                // Weekend boost
                double weekendMultiplier = (currentDate.getDayOfWeek().getValue() >= 6) ? 1.2 : 1.0;
                
                // Combine factors
                double totalMultiplier = growthFactor * weekendMultiplier;
                
                // Create 1 shift per day (reduced)
                int shiftsPerDay = 1;
                
                for (int shiftNum = 0; shiftNum < shiftsPerDay; shiftNum++) {
                    User cashier = cashiers.get(random.nextInt(cashiers.size()));
                    
                    LocalDateTime shiftStart = currentDate.withHour(9).withMinute(0);
                    LocalDateTime shiftEnd = shiftStart.plusHours(8);
                    
                    // Create orders during this shift with reduced count
                    List<Order> shiftOrders = createUltraOptimizedShiftOrders(branch, cashier, products, 
                                                                       customers, shiftStart, shiftEnd, totalMultiplier);
                    
                    // Create shift report
                    createUltraOptimizedShiftReport(branch, cashier, shiftOrders, shiftStart, shiftEnd);
                }
                
                currentDate = currentDate.plusDays(1);
                dayIndex++;
            }
        }
        
        log.info("Created {} days of ULTRA-OPTIMIZED transaction data for all branches", MAX_DAYS);
    }

    private List<Order> createUltraOptimizedShiftOrders(Branch branch, User cashier, List<Product> products,
                                         List<Customer> customers, LocalDateTime shiftStart, 
                                         LocalDateTime shiftEnd, double multiplier) {
        
        List<Order> orders = new ArrayList<>();
        PaymentType[] paymentTypes = PaymentType.values();
        
        // Create 3-8 orders per shift (much reduced)
        int baseOrderCount = random.nextInt(6) + 3;
        int orderCount = (int) Math.round(baseOrderCount * multiplier);
        orderCount = Math.min(orderCount, MAX_ORDERS_PER_DAY); // Cap at max
        
        for (int i = 0; i < orderCount; i++) {
            // Random time during shift
            long minutesInShift = java.time.Duration.between(shiftStart, shiftEnd).toMinutes();
            long randomMinutes = ThreadLocalRandom.current().nextLong(minutesInShift);
            LocalDateTime orderTime = shiftStart.plusMinutes(randomMinutes);
            
            // 70% chance customer is registered
            Customer customer = random.nextDouble() < 0.7 ? 
                customers.get(random.nextInt(customers.size())) : null;
            
            // Payment type distribution
            PaymentType paymentType = getRealisticPaymentType();
            
            Order order = Order.builder()
                .branch(branch)
                .cashier(cashier)
                .customer(customer)
                .paymentType(paymentType)
                .status(OrderStatus.COMPLETED)
                .createdAt(orderTime)
                .build();
            
            // Create 1-2 items per order (reduced)
            int itemCount = random.nextDouble() < 0.9 ? 1 : 2;
            List<OrderItem> orderItems = new ArrayList<>();
            double totalAmount = 0.0;
            
            // Select unique products for the order
            Set<Product> selectedProducts = new HashSet<>();
            while (selectedProducts.size() < itemCount) {
                Product product = products.get(random.nextInt(products.size()));
                selectedProducts.add(product);
            }
            
            for (Product product : selectedProducts) {
                int quantity = 1; // Always 1 item
                double price = product.getSellingPrice();
                double itemTotal = price * quantity;
                totalAmount += itemTotal;
                
                OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(quantity)
                    .price(price)
                    .order(order)
                    .build();
                orderItems.add(orderItem);
            }
            
            order.setTotalAmount(totalAmount);
            order.setItems(orderItems);
            
            Order savedOrder = orderRepository.save(order);
            orderItemRepository.saveAll(orderItems);
            orders.add(savedOrder);
        }
        
        return orders;
    }

    private void createUltraOptimizedShiftReport(Branch branch, User cashier, List<Order> orders, 
                                  LocalDateTime shiftStart, LocalDateTime shiftEnd) {
        
        double totalSales = orders.stream()
            .mapToDouble(Order::getTotalAmount)
            .sum();
        
        // Create 0-1 refunds per shift (reduced)
        int refundCount = random.nextDouble() < 0.2 ? 0 : 1;
        List<Refund> refunds = new ArrayList<>();
        double totalRefunds = 0.0;
        
        if (refundCount > 0 && !orders.isEmpty()) {
            Order order = orders.get(random.nextInt(orders.size()));
            double refundAmount = order.getTotalAmount() * 0.8; // 80% refund
            
            Refund refund = new Refund();
            refund.setOrder(order);
            refund.setReason(getRandomRefundReason());
            refund.setAmount(refundAmount);
            refund.setCashier(cashier);
            refund.setBranch(branch);
            refund.setPaymentType(order.getPaymentType());
            refund.setCreatedAt(shiftEnd.minusMinutes(random.nextInt(60)));
            
            refunds.add(refundRepository.save(refund));
            totalRefunds += refundAmount;
        }
        
        // Get top 2 selling products (reduced from 3)
        Map<Product, Integer> productQuantities = new HashMap<>();
        for (Order order : orders) {
            for (OrderItem item : order.getItems()) {
                productQuantities.merge(item.getProduct(), item.getQuantity(), Integer::sum);
            }
        }
        
        List<Product> topProducts = productQuantities.entrySet().stream()
            .sorted(Map.Entry.<Product, Integer>comparingByValue().reversed())
            .limit(2)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
        
        ShiftReport shiftReport = new ShiftReport();
        shiftReport.setShiftStart(shiftStart);
        shiftReport.setShiftEnd(shiftEnd);
        shiftReport.setTotalSales(totalSales);
        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setNetSales(totalSales - totalRefunds);
        shiftReport.setTotalOrders(orders.size());
        shiftReport.setCashier(cashier);
        shiftReport.setBranch(branch);
        shiftReport.setTopSellingProducts(topProducts);
        shiftReport.setRecentOrders(orders.stream().limit(3).collect(Collectors.toList())); // Reduced from 5
        shiftReport.setRefunds(refunds);
        
        shiftReportRepository.save(shiftReport);
        
        // Update refunds with shift report reference
        for (Refund refund : refunds) {
            refund.setShiftReport(shiftReport);
            refundRepository.save(refund);
        }
    }

    // Helper methods
    private String generatePhoneNumber() {
        return String.format("+1-%03d-%03d-%04d", 
            random.nextInt(900) + 100,
            random.nextInt(900) + 100,
            random.nextInt(9000) + 1000);
    }

    private String generateAddress() {
        String[] streets = {"Main St", "Oak Ave", "Maple Dr"};
        String[] cities = {"New York", "Los Angeles", "Chicago"};
        String[] states = {"NY", "CA", "IL"};
        
        int streetNumber = random.nextInt(9000) + 1000;
        String street = streets[random.nextInt(streets.length)];
        String city = cities[random.nextInt(cities.length)];
        String state = states[random.nextInt(states.length)];
        int zip = random.nextInt(90000) + 10000;
        
        return String.format("%d %s, %s, %s %d", streetNumber, street, city, state, zip);
    }

    private String generateSKU(String brand, int index) {
        String prefix = brand.toUpperCase().replace(" ", "").substring(0, 
                       Math.min(4, brand.replace(" ", "").length()));
        return String.format("%s-%06d", prefix, index + 1);
    }

    private String getRandomRefundReason() {
        String[] reasons = {
            "Defective product",
            "Wrong item received",
            "Customer changed mind"
        };
        return reasons[random.nextInt(reasons.length)];
    }

    private PaymentType getRealisticPaymentType() {
        double rand = random.nextDouble();
        if (rand < 0.40) {
            return PaymentType.CARD;
        } else if (rand < 0.75) {
            return PaymentType.UPI;
        } else {
            return PaymentType.CASH;
        }
    }

    // Helper class for product data
    private static class ProductData {
        String name;
        String description;
        String brand;
        double mrp;
        double sellingPrice;
        
        ProductData(String name, String description, String brand, double mrp, double sellingPrice) {
            this.name = name;
            this.description = description;
            this.brand = brand;
            this.mrp = mrp;
            this.sellingPrice = sellingPrice;
        }
    }
}
