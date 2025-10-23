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

@Component  // ENABLED - Railway optimized version
@RequiredArgsConstructor
@Slf4j
public class RailwayOptimizedDataInitializationComponent implements CommandLineRunner {

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
    
    // Railway Free Tier Optimizations
    private static final int BATCH_SIZE = 25; // Smaller batches for memory efficiency
    private static final int MAX_ORDERS_PER_DAY = 10; // Reduced for free tier
    private static final int MAX_DAYS = 14; // Only 2 weeks of data
    private static final int MAX_PRODUCTS_PER_STORE = 20; // Reduced product count
    private static final int MAX_CUSTOMERS = 25; // Reduced customer count

    @Override
    @Transactional
    public void run(String... args) {
        try {
            log.info("==============================================");
            log.info("Starting RAILWAY OPTIMIZED data initialization...");
            log.info("Free tier optimizations: 14 days, 10 orders/day, 20 products/store");
            log.info("==============================================");
            
            // Check if data already exists
            long userCount = userRepository.count();
            log.info("Current user count in database: {}", userCount);
            
            if (userCount > 0) {
                log.warn("Data already exists. Skipping initialization.");
                log.info("Found {} users in database", userCount);
                return;
            }

            log.info("Database is empty. Proceeding with Railway-optimized initialization...");
            
            initializeAdminUser();
            initializeSubscriptionPlans();
            initializeOptimizedSampleData();
            
            // Verify data was created
            long finalUserCount = userRepository.count();
            long storeCount = storeRepository.count();
            long productCount = productRepository.count();
            
            log.info("==============================================");
            log.info("Railway-optimized data initialization completed!");
            log.info("Created {} users", finalUserCount);
            log.info("Created {} stores", storeCount);
            log.info("Created {} products", productCount);
            log.info("Memory optimized for Railway free tier");
            log.info("==============================================");
            
        } catch (Exception e) {
            log.error("==============================================");
            log.error("FATAL ERROR: Railway data initialization failed!");
            log.error("Exception: {}", e.getMessage());
            log.error("Stack trace:", e);
            log.error("==============================================");
            throw new RuntimeException("Railway data initialization failed", e);
        }
    }

    private void initializeAdminUser() {
        String adminUsername = "adminstore@possystem.com";

        if (userRepository.findByEmail(adminUsername) == null) {
            User adminUser = new User();
            adminUser.setPassword(passwordEncoder.encode("codewithzosh"));
            adminUser.setFullName("Admin User");
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
                .description("Perfect for small businesses")
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
                .description("Ideal for growing businesses")
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

    private void initializeOptimizedSampleData() {
        log.info("Creating Railway-optimized sample data...");
        log.info("Features: 14-day historical data, reduced complexity for free tier");
        
        // Get subscription plans
        List<SubscriptionPlan> plans = subscriptionPlanRepository.findAll();
        
        // Create only 2 stores for free tier optimization
        createOptimizedStore("TechMart Electronics", "Electronics retail store", 
            "Electronics", StoreStatus.ACTIVE, plans.get(1), 2);
        
        createOptimizedStore("Fresh Grocery Store", "Neighborhood grocery store", 
            "Grocery", StoreStatus.ACTIVE, plans.get(0), 1);
    }

    private void createOptimizedStore(String brandName, String description, String storeType, 
                            StoreStatus status, SubscriptionPlan plan, int numBranches) {
        
        log.info("Creating Railway-optimized store: {}", brandName);
        
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
        LocalDate startDate = LocalDate.now().minusMonths(1);
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
            List<Branch> branches = createOptimizedBranches(store, numBranches);
            
            // Create categories and products (reduced count)
            List<Category> categories = createOptimizedCategories(store, storeType);
            List<Product> products = createOptimizedProducts(store, categories, storeType);
            
            // Create inventory for all branches
            createOptimizedInventory(branches, products);
            
            // Create customers (reduced count)
            List<Customer> customers = createOptimizedCustomers(store, MAX_CUSTOMERS);
            
            // Create cashiers for each branch
            Map<Branch, List<User>> branchCashiers = new HashMap<>();
            for (Branch branch : branches) {
                List<User> cashiers = createOptimizedCashiers(store, branch, 2); // Only 2 cashiers per branch
                branchCashiers.put(branch, cashiers);
            }
            
            // Create optimized transaction data (14 days only)
            createOptimizedTransactionData(branches, branchCashiers, products, customers);
        }
        
        log.info("Railway-optimized store '{}' created with status: {}", brandName, status);
    }

    private List<Branch> createOptimizedBranches(Store store, int count) {
        List<Branch> branches = new ArrayList<>();
        String[] locations = {"Downtown", "Mall", "Airport"};
        
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
        
        log.info("Created {} Railway-optimized branches for store: {}", count, store.getBrand());
        return branches;
    }

    private List<Category> createOptimizedCategories(Store store, String storeType) {
        List<Category> categories = new ArrayList<>();
        Map<String, List<String>> categoryMap = new HashMap<>();
        
        categoryMap.put("Electronics", Arrays.asList("Smartphones", "Laptops", "Accessories"));
        categoryMap.put("Grocery", Arrays.asList("Fruits & Vegetables", "Dairy Products", "Beverages"));
        categoryMap.put("Fashion", Arrays.asList("Men's Clothing", "Women's Clothing", "Accessories"));
        categoryMap.put("Books & Stationery", Arrays.asList("Fiction", "Educational", "Office Supplies"));
        categoryMap.put("Home & Furniture", Arrays.asList("Living Room", "Bedroom", "Kitchen"));
        
        List<String> categoryNames = categoryMap.getOrDefault(storeType, 
            Arrays.asList("General", "Electronics", "Accessories"));
        
        for (String categoryName : categoryNames) {
            Category category = Category.builder()
                .name(categoryName)
                .store(store)
                .build();
            categories.add(categoryRepository.save(category));
        }
        
        log.info("Created {} Railway-optimized categories for store: {}", categories.size(), store.getBrand());
        return categories;
    }

    private List<Product> createOptimizedProducts(Store store, List<Category> categories, String storeType) {
        List<Product> products = new ArrayList<>();
        
        Map<String, List<ProductData>> productDataMap = new HashMap<>();
        
        // Electronics products (reduced set)
        productDataMap.put("Electronics", Arrays.asList(
            new ProductData("iPhone 15 Pro", "Latest Apple smartphone", "Apple", 999.99, 949.99),
            new ProductData("Samsung Galaxy S24", "Flagship Android smartphone", "Samsung", 899.99, 849.99),
            new ProductData("MacBook Pro 14\"", "M3 chip, 16GB RAM", "Apple", 1999.99, 1899.99),
            new ProductData("Dell XPS 15", "Intel i7, 16GB RAM", "Dell", 1599.99, 1499.99),
            new ProductData("iPad Air", "10.9-inch display", "Apple", 599.99, 569.99),
            new ProductData("Sony WH-1000XM5", "Noise-cancelling headphones", "Sony", 399.99, 349.99),
            new ProductData("AirPods Pro", "Active noise cancellation", "Apple", 249.99, 229.99),
            new ProductData("Apple Watch Series 9", "GPS + Cellular", "Apple", 499.99, 469.99),
            new ProductData("USB-C Cable 6ft", "Fast charging cable", "Generic", 19.99, 14.99),
            new ProductData("Phone Case", "Protective silicone case", "Generic", 29.99, 19.99)
        ));
        
        // Grocery products (reduced set)
        productDataMap.put("Grocery", Arrays.asList(
            new ProductData("Organic Bananas", "Fresh organic bananas per lb", "Local Farm", 0.99, 0.79),
            new ProductData("Whole Milk", "1 Gallon fresh milk", "Dairy Fresh", 4.99, 4.49),
            new ProductData("White Bread", "Sliced bread loaf", "Wonder", 2.99, 2.49),
            new ProductData("Orange Juice", "100% pure orange juice", "Tropicana", 5.99, 4.99),
            new ProductData("Potato Chips", "Classic flavor", "Lay's", 4.99, 3.99),
            new ProductData("Frozen Pizza", "Pepperoni pizza", "DiGiorno", 8.99, 7.99),
            new ProductData("Chicken Breast", "Boneless skinless, per lb", "Tyson", 6.99, 6.49),
            new ProductData("Paper Towels", "12-pack mega rolls", "Bounty", 24.99, 22.99),
            new ProductData("Apples", "Red delicious, per lb", "Local Farm", 1.99, 1.79),
            new ProductData("Yogurt", "Greek yogurt variety pack", "Chobani", 6.99, 5.99)
        ));
        
        List<ProductData> productDataList = productDataMap.getOrDefault(storeType, 
            productDataMap.get("Electronics"));
        
        // Limit products to MAX_PRODUCTS_PER_STORE
        int productCount = Math.min(productDataList.size(), MAX_PRODUCTS_PER_STORE);
        
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
        
        log.info("Created {} Railway-optimized products for store: {}", products.size(), store.getBrand());
        return products;
    }

    private void createOptimizedInventory(List<Branch> branches, List<Product> products) {
        List<Inventory> inventories = new ArrayList<>();
        
        for (Branch branch : branches) {
            for (Product product : products) {
                int quantity = random.nextInt(100) + 25; // 25-125 units (reduced)
                
                Inventory inventory = Inventory.builder()
                    .branch(branch)
                    .product(product)
                    .quantity(quantity)
                    .build();
                inventories.add(inventory);
            }
        }
        
        inventoryRepository.saveAll(inventories);
        log.info("Created Railway-optimized inventory for {} branches", branches.size());
    }

    private List<Customer> createOptimizedCustomers(Store store, int count) {
        List<Customer> customers = new ArrayList<>();
        String[] firstNames = {"John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", 
            "Lisa", "James", "Mary", "William", "Jennifer", "Richard", "Patricia", "Thomas", 
            "Linda", "Charles", "Elizabeth", "Daniel", "Susan"};
        String[] lastNames = {"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", 
            "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", 
            "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"};
        
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
        
        log.info("Created {} Railway-optimized customers for store: {}", count, store.getBrand());
        return customers;
    }

    private List<User> createOptimizedCashiers(Store store, Branch branch, int count) {
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
        
        log.info("Created {} Railway-optimized cashiers for branch: {}", count, branch.getName());
        return cashiers;
    }

    private void createOptimizedTransactionData(List<Branch> branches, 
                                             Map<Branch, List<User>> branchCashiers,
                                             List<Product> products,
                                             List<Customer> customers) {
        
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(MAX_DAYS); // Only 14 days
        
        log.info("Creating Railway-optimized transaction data from {} to {} ({} days)", 
                startDate, endDate, MAX_DAYS);
        
        for (Branch branch : branches) {
            List<User> cashiers = branchCashiers.get(branch);
            
            // Create data for each day in the past 14 days
            LocalDateTime currentDate = startDate;
            int dayIndex = 0;
            
            while (currentDate.isBefore(endDate)) {
                
                // Calculate growth factor (simulate business growth over time)
                double growthFactor = 1.0 + (dayIndex / (double)MAX_DAYS) * 0.2; // 20% growth over 14 days
                
                // Weekend boost
                double weekendMultiplier = (currentDate.getDayOfWeek().getValue() >= 6) ? 1.3 : 1.0;
                
                // Combine factors
                double totalMultiplier = growthFactor * weekendMultiplier;
                
                // Create 1-2 shifts per day (reduced)
                int shiftsPerDay = random.nextInt(2) + 1;
                
                for (int shiftNum = 0; shiftNum < shiftsPerDay; shiftNum++) {
                    User cashier = cashiers.get(random.nextInt(cashiers.size()));
                    
                    LocalDateTime shiftStart = currentDate.withHour(shiftNum == 0 ? 9 : 14)
                                                          .withMinute(0);
                    LocalDateTime shiftEnd = shiftStart.plusHours(6);
                    
                    // Create orders during this shift with dynamic multiplier
                    List<Order> shiftOrders = createOptimizedShiftOrders(branch, cashier, products, 
                                                               customers, shiftStart, shiftEnd, totalMultiplier);
                    
                    // Create shift report
                    createOptimizedShiftReport(branch, cashier, shiftOrders, shiftStart, shiftEnd);
                }
                
                currentDate = currentDate.plusDays(1);
                dayIndex++;
            }
        }
        
        log.info("Created {} days of Railway-optimized transaction data", MAX_DAYS);
    }

    private List<Order> createOptimizedShiftOrders(Branch branch, User cashier, List<Product> products,
                                         List<Customer> customers, LocalDateTime shiftStart, 
                                         LocalDateTime shiftEnd, double multiplier) {
        
        List<Order> orders = new ArrayList<>();
        PaymentType[] paymentTypes = PaymentType.values();
        
        // Create 5-15 orders per shift (reduced for free tier)
        int baseOrderCount = random.nextInt(11) + 5;
        int orderCount = Math.min((int) Math.round(baseOrderCount * multiplier), MAX_ORDERS_PER_DAY);
        
        for (int i = 0; i < orderCount; i++) {
            // Random time during shift
            long minutesInShift = java.time.Duration.between(shiftStart, shiftEnd).toMinutes();
            long randomMinutes = ThreadLocalRandom.current().nextLong(minutesInShift);
            LocalDateTime orderTime = shiftStart.plusMinutes(randomMinutes);
            
            // 60% chance customer is registered
            Customer customer = random.nextDouble() < 0.6 ? 
                customers.get(random.nextInt(customers.size())) : null;
            
            // Payment type distribution: 40% card, 35% UPI, 25% cash
            PaymentType paymentType = getRealisticPaymentType();
            
            Order order = Order.builder()
                .branch(branch)
                .cashier(cashier)
                .customer(customer)
                .paymentType(paymentType)
                .status(OrderStatus.COMPLETED)
                .createdAt(orderTime)
                .build();
            
            // Create 1-4 items per order (reduced)
            int itemCount = random.nextDouble() < 0.7 ? random.nextInt(2) + 1 : random.nextInt(3) + 2;
            List<OrderItem> orderItems = new ArrayList<>();
            double totalAmount = 0.0;
            
            // Select unique products for the order
            Set<Product> selectedProducts = new HashSet<>();
            while (selectedProducts.size() < itemCount) {
                Product product = products.get(random.nextInt(products.size()));
                selectedProducts.add(product);
            }
            
            for (Product product : selectedProducts) {
                // Most orders have 1-2 items of each product
                int quantity = random.nextDouble() < 0.8 ? 1 : random.nextInt(2) + 1;
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

    private void createOptimizedShiftReport(Branch branch, User cashier, List<Order> orders, 
                                  LocalDateTime shiftStart, LocalDateTime shiftEnd) {
        
        double totalSales = orders.stream()
            .mapToDouble(Order::getTotalAmount)
            .sum();
        
        // Create 0-1 refunds per shift (reduced)
        int refundCount = random.nextDouble() < 0.3 ? 0 : 1;
        List<Refund> refunds = new ArrayList<>();
        double totalRefunds = 0.0;
        
        if (refundCount > 0 && !orders.isEmpty()) {
            Order order = orders.get(random.nextInt(orders.size()));
            
            // 80% full refund, 20% partial
            double refundAmount = random.nextDouble() < 0.8 ? 
                order.getTotalAmount() : 
                order.getTotalAmount() * (random.nextDouble() * 0.5 + 0.3);
            
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
        
        // Get top 3 selling products (reduced from 5)
        Map<Product, Integer> productQuantities = new HashMap<>();
        for (Order order : orders) {
            for (OrderItem item : order.getItems()) {
                productQuantities.merge(item.getProduct(), item.getQuantity(), Integer::sum);
            }
        }
        
        List<Product> topProducts = productQuantities.entrySet().stream()
            .sorted(Map.Entry.<Product, Integer>comparingByValue().reversed())
            .limit(3)
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
        shiftReport.setRecentOrders(orders.stream().limit(5).collect(Collectors.toList())); // Reduced from 10
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
        String[] streets = {"Main St", "Oak Ave", "Maple Dr", "Park Blvd", "Washington St"};
        String[] cities = {"New York", "Los Angeles", "Chicago", "Houston", "Phoenix"};
        String[] states = {"NY", "CA", "IL", "TX", "AZ"};
        
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
            "Customer changed mind",
            "Product not as described"
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
