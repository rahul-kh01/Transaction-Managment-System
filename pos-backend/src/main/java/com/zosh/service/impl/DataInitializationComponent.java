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
public class DataInitializationComponent implements CommandLineRunner {

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

    @Override
    @Transactional
    public void run(String... args) {
        try {
            log.info("==============================================");
            log.info("Starting data initialization...");
            log.info("==============================================");
            
            // Check if data already exists
            long userCount = userRepository.count();
            log.info("Current user count in database: {}", userCount);
            
            if (userCount > 0) {
                log.warn("Data already exists. Skipping initialization.");
                log.info("Found {} users in database", userCount);
                return;
            }

            log.info("Database is empty. Proceeding with data initialization...");
            
            initializeAdminUser();
            initializeSubscriptionPlans();
            initializeSampleData();
            
            // Verify data was created
            long finalUserCount = userRepository.count();
            long storeCount = storeRepository.count();
            long productCount = productRepository.count();
            
            log.info("==============================================");
            log.info("Data initialization completed successfully!");
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
                .build(),
                
            SubscriptionPlan.builder()
                .name("Enterprise")
                .description("Complete solution for large-scale operations")
                .price(199.99)
                .billingCycle(BillingCycle.MONTHLY)
                .maxBranches(999)
                .maxUsers(999)
                .maxProducts(99999)
                .enableAdvancedReports(true)
                .enableInventory(true)
                .enableIntegrations(true)
                .enableEcommerce(true)
                .enableInvoiceBranding(true)
                .prioritySupport(true)
                .enableMultiLocation(true)
                .extraFeatures(Arrays.asList("Dedicated account manager", "24/7 phone support", 
                    "Custom integrations", "White-label options", "Advanced security"))
                .build(),
                
            SubscriptionPlan.builder()
                .name("Starter Annual")
                .description("Annual plan for small businesses (Save 20%)")
                .price(287.90)
                .billingCycle(BillingCycle.YEARLY)
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
                .extraFeatures(Arrays.asList("Basic reporting", "Email support", "2 months free"))
                .build()
        );

        subscriptionPlanRepository.saveAll(plans);
        log.info("Subscription plans created: {}", plans.size());
    }

    private void initializeSampleData() {
        log.info("Creating sample stores with comprehensive sales data...");
        log.info("Features: 90-day historical data, growth trends, seasonal patterns, realistic payment distribution");
        
        // Get subscription plans
        List<SubscriptionPlan> plans = subscriptionPlanRepository.findAll();
        
        // Create multiple stores with different scenarios
        // Each active store will have 90 days of sales data with realistic patterns
        createStore("TechMart Electronics", "Electronics and gadgets retail chain", 
            "Electronics", StoreStatus.ACTIVE, plans.get(1), 3);
        
        createStore("Fresh Grocery Store", "Your neighborhood grocery store", 
            "Grocery", StoreStatus.ACTIVE, plans.get(2), 5);
        
        createStore("Fashion Hub", "Trendy clothing and accessories", 
            "Fashion", StoreStatus.ACTIVE, plans.get(1), 2);
        
        createStore("Book Paradise", "Books, stationery, and educational materials", 
            "Books & Stationery", StoreStatus.ACTIVE, plans.get(0), 1);
        
        createStore("Home Essentials", "Furniture and home decor", 
            "Home & Furniture", StoreStatus.PENDING, plans.get(1), 2);
    }

    private void createStore(String brandName, String description, String storeType, 
                            StoreStatus status, SubscriptionPlan plan, int numBranches) {
        
        log.info("Creating store: {}", brandName);
        
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
        LocalDate startDate = LocalDate.now().minusMonths(2);
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
            List<Branch> branches = createBranches(store, numBranches);
            
            // Create categories and products
            List<Category> categories = createCategories(store, storeType);
            List<Product> products = createProducts(store, categories, storeType);
            
            // Create inventory for all branches
            createInventory(branches, products);
            
            // Create customers
            List<Customer> customers = createCustomers(store, 50);
            
            // Create cashiers for each branch
            Map<Branch, List<User>> branchCashiers = new HashMap<>();
            for (Branch branch : branches) {
                List<User> cashiers = createCashiers(store, branch, 3);
                branchCashiers.put(branch, cashiers);
            }
            
            // Create orders, shift reports, and refunds for the past month
            createMonthlyTransactionData(branches, branchCashiers, products, customers);
        }
        
        log.info("Store '{}' created with status: {}", brandName, status);
    }

    private List<Branch> createBranches(Store store, int count) {
        List<Branch> branches = new ArrayList<>();
        String[] locations = {"Downtown", "Mall of America", "Airport", "Westside", "Eastside", 
                             "North Plaza", "South Street", "Central Station"};
        
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
        
        log.info("Created {} branches for store: {}", count, store.getBrand());
        return branches;
    }

    private List<Category> createCategories(Store store, String storeType) {
        List<Category> categories = new ArrayList<>();
        Map<String, List<String>> categoryMap = new HashMap<>();
        
        categoryMap.put("Electronics", Arrays.asList("Smartphones", "Laptops", "Tablets", 
            "Headphones", "Smart Watches", "Cameras", "Gaming Consoles", "Accessories"));
        categoryMap.put("Grocery", Arrays.asList("Fruits & Vegetables", "Dairy Products", 
            "Bakery", "Beverages", "Snacks", "Frozen Foods", "Meat & Seafood", "Household Items"));
        categoryMap.put("Fashion", Arrays.asList("Men's Clothing", "Women's Clothing", 
            "Kids Clothing", "Footwear", "Accessories", "Bags", "Watches", "Jewelry"));
        categoryMap.put("Books & Stationery", Arrays.asList("Fiction", "Non-Fiction", 
            "Educational", "Children's Books", "Notebooks", "Pens & Pencils", "Art Supplies", "Office Supplies"));
        categoryMap.put("Home & Furniture", Arrays.asList("Living Room", "Bedroom", 
            "Kitchen", "Dining", "Office Furniture", "Decor", "Lighting", "Storage"));
        
        List<String> categoryNames = categoryMap.getOrDefault(storeType, 
            Arrays.asList("General", "Electronics", "Accessories", "Supplies"));
        
        for (String categoryName : categoryNames) {
            Category category = Category.builder()
                .name(categoryName)
                .store(store)
                .build();
            categories.add(categoryRepository.save(category));
        }
        
        log.info("Created {} categories for store: {}", categories.size(), store.getBrand());
        return categories;
    }

    private List<Product> createProducts(Store store, List<Category> categories, String storeType) {
        List<Product> products = new ArrayList<>();
        
        Map<String, List<ProductData>> productDataMap = new HashMap<>();
        
        // Electronics products
        productDataMap.put("Electronics", Arrays.asList(
            new ProductData("iPhone 15 Pro", "Latest Apple smartphone with A17 chip", "Apple", 999.99, 949.99),
            new ProductData("Samsung Galaxy S24", "Flagship Android smartphone", "Samsung", 899.99, 849.99),
            new ProductData("MacBook Pro 14\"", "M3 chip, 16GB RAM, 512GB SSD", "Apple", 1999.99, 1899.99),
            new ProductData("Dell XPS 15", "Intel i7, 16GB RAM, 1TB SSD", "Dell", 1599.99, 1499.99),
            new ProductData("iPad Air", "10.9-inch display, M1 chip", "Apple", 599.99, 569.99),
            new ProductData("Sony WH-1000XM5", "Premium noise-cancelling headphones", "Sony", 399.99, 349.99),
            new ProductData("AirPods Pro", "Active noise cancellation", "Apple", 249.99, 229.99),
            new ProductData("Apple Watch Series 9", "GPS + Cellular, 45mm", "Apple", 499.99, 469.99),
            new ProductData("Canon EOS R6", "Full-frame mirrorless camera", "Canon", 2499.99, 2399.99),
            new ProductData("PlayStation 5", "Gaming console with 1TB storage", "Sony", 499.99, 499.99),
            new ProductData("Xbox Series X", "4K gaming console", "Microsoft", 499.99, 499.99),
            new ProductData("Nintendo Switch OLED", "Portable gaming console", "Nintendo", 349.99, 329.99),
            new ProductData("USB-C Cable 6ft", "Fast charging cable", "Generic", 19.99, 14.99),
            new ProductData("Phone Case", "Protective silicone case", "Generic", 29.99, 19.99),
            new ProductData("Screen Protector", "Tempered glass", "Generic", 9.99, 7.99)
        ));
        
        // Grocery products
        productDataMap.put("Grocery", Arrays.asList(
            new ProductData("Organic Bananas", "Fresh organic bananas per lb", "Local Farm", 0.99, 0.79),
            new ProductData("Whole Milk", "1 Gallon fresh milk", "Dairy Fresh", 4.99, 4.49),
            new ProductData("White Bread", "Sliced bread loaf", "Wonder", 2.99, 2.49),
            new ProductData("Orange Juice", "100% pure orange juice, 64oz", "Tropicana", 5.99, 4.99),
            new ProductData("Potato Chips", "Classic flavor, family size", "Lay's", 4.99, 3.99),
            new ProductData("Frozen Pizza", "Pepperoni pizza", "DiGiorno", 8.99, 7.99),
            new ProductData("Chicken Breast", "Boneless skinless, per lb", "Tyson", 6.99, 6.49),
            new ProductData("Paper Towels", "12-pack mega rolls", "Bounty", 24.99, 22.99),
            new ProductData("Apples", "Red delicious, per lb", "Local Farm", 1.99, 1.79),
            new ProductData("Yogurt", "Greek yogurt, variety pack", "Chobani", 6.99, 5.99),
            new ProductData("Eggs", "Large eggs, dozen", "Organic Valley", 5.99, 4.99),
            new ProductData("Coffee", "Ground coffee, 12oz", "Starbucks", 9.99, 8.99),
            new ProductData("Cereal", "Whole grain cereal", "Cheerios", 4.99, 4.49),
            new ProductData("Pasta", "Spaghetti, 16oz", "Barilla", 2.99, 2.49),
            new ProductData("Tomato Sauce", "Marinara sauce, 24oz", "Prego", 3.99, 3.49)
        ));
        
        // Fashion products
        productDataMap.put("Fashion", Arrays.asList(
            new ProductData("Men's T-Shirt", "Cotton crew neck t-shirt", "Nike", 29.99, 24.99),
            new ProductData("Women's Dress", "Summer floral dress", "Zara", 79.99, 69.99),
            new ProductData("Kids Jeans", "Denim jeans, various sizes", "Gap", 39.99, 34.99),
            new ProductData("Running Shoes", "Athletic running shoes", "Adidas", 89.99, 79.99),
            new ProductData("Leather Belt", "Genuine leather belt", "Fossil", 49.99, 39.99),
            new ProductData("Backpack", "Water-resistant backpack", "North Face", 99.99, 89.99),
            new ProductData("Sunglasses", "Polarized sunglasses", "Ray-Ban", 159.99, 149.99),
            new ProductData("Watch", "Analog wristwatch", "Timex", 79.99, 69.99),
            new ProductData("Necklace", "Sterling silver necklace", "Pandora", 129.99, 119.99),
            new ProductData("Men's Shirt", "Formal dress shirt", "Calvin Klein", 59.99, 49.99),
            new ProductData("Women's Blazer", "Professional blazer", "H&M", 89.99, 79.99),
            new ProductData("Sneakers", "Casual sneakers", "Vans", 64.99, 59.99),
            new ProductData("Handbag", "Leather handbag", "Michael Kors", 199.99, 179.99),
            new ProductData("Scarf", "Wool winter scarf", "Burberry", 149.99, 139.99),
            new ProductData("Socks Pack", "6-pack cotton socks", "Hanes", 14.99, 12.99)
        ));
        
        // Books products
        productDataMap.put("Books & Stationery", Arrays.asList(
            new ProductData("Best Selling Novel", "Award-winning fiction", "Penguin", 24.99, 19.99),
            new ProductData("Self-Help Book", "Personal development guide", "Simon & Schuster", 19.99, 16.99),
            new ProductData("Math Textbook", "Grade 10 mathematics", "McGraw-Hill", 79.99, 69.99),
            new ProductData("Children's Picture Book", "Illustrated story book", "Scholastic", 12.99, 9.99),
            new ProductData("Spiral Notebook", "College ruled, 100 pages", "Mead", 4.99, 3.99),
            new ProductData("Gel Pen Set", "12-color gel pen set", "Pilot", 14.99, 12.99),
            new ProductData("Watercolor Set", "24-color watercolor paints", "Crayola", 19.99, 16.99),
            new ProductData("Stapler", "Desktop stapler with staples", "Swingline", 9.99, 7.99),
            new ProductData("Sticky Notes", "Multicolor sticky notes pack", "Post-it", 8.99, 6.99),
            new ProductData("Pencil Set", "12-pack #2 pencils", "Ticonderoga", 5.99, 4.99),
            new ProductData("Markers", "Permanent markers, 8-pack", "Sharpie", 11.99, 9.99),
            new ProductData("Binder", "3-ring binder, 2-inch", "Avery", 7.99, 6.99),
            new ProductData("Calculator", "Scientific calculator", "Texas Instruments", 24.99, 21.99),
            new ProductData("Highlighters", "Fluorescent highlighters, 6-pack", "Sharpie", 8.99, 7.99),
            new ProductData("Glue Stick", "Non-toxic glue stick, 3-pack", "Elmer's", 4.99, 3.99)
        ));
        
        // Home & Furniture products
        productDataMap.put("Home & Furniture", Arrays.asList(
            new ProductData("Sofa Set", "3-seater fabric sofa", "IKEA", 799.99, 749.99),
            new ProductData("Queen Bed Frame", "Wooden bed frame with headboard", "Ashley", 599.99, 549.99),
            new ProductData("Dining Table", "6-person dining table", "Wayfair", 499.99, 449.99),
            new ProductData("Office Chair", "Ergonomic office chair", "Herman Miller", 399.99, 369.99),
            new ProductData("Table Lamp", "Modern LED table lamp", "Philips", 49.99, 39.99),
            new ProductData("Throw Pillow", "Decorative throw pillow", "Target", 19.99, 14.99),
            new ProductData("Area Rug", "5x7 ft area rug", "Home Depot", 149.99, 129.99),
            new ProductData("Bookshelf", "5-tier wooden bookshelf", "Amazon Basics", 89.99, 79.99),
            new ProductData("Kitchen Cabinet", "Wall-mounted cabinet", "IKEA", 199.99, 179.99),
            new ProductData("Coffee Table", "Glass top coffee table", "West Elm", 299.99, 269.99),
            new ProductData("Nightstand", "2-drawer nightstand", "Ashley", 129.99, 119.99),
            new ProductData("Curtains", "Blackout curtains, 2-pack", "Amazon", 39.99, 34.99),
            new ProductData("Wall Clock", "Modern wall clock", "Seiko", 59.99, 49.99),
            new ProductData("Storage Bins", "Stackable storage bins, 6-pack", "Sterilite", 34.99, 29.99),
            new ProductData("Desk Organizer", "Multi-compartment organizer", "SimpleHouseware", 24.99, 19.99)
        ));
        
        List<ProductData> productDataList = productDataMap.getOrDefault(storeType, 
            productDataMap.get("Electronics"));
        
        for (int i = 0; i < productDataList.size(); i++) {
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
        
        log.info("Created {} products for store: {}", products.size(), store.getBrand());
        return products;
    }

    private void createInventory(List<Branch> branches, List<Product> products) {
        List<Inventory> inventories = new ArrayList<>();
        
        for (Branch branch : branches) {
            for (Product product : products) {
                int quantity = random.nextInt(200) + 50; // 50-250 units
                
                Inventory inventory = Inventory.builder()
                    .branch(branch)
                    .product(product)
                    .quantity(quantity)
                    .build();
                inventories.add(inventory);
            }
        }
        
        inventoryRepository.saveAll(inventories);
        log.info("Created inventory for {} branches", branches.size());
    }

    private List<Customer> createCustomers(Store store, int count) {
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
        
        log.info("Created {} customers for store: {}", count, store.getBrand());
        return customers;
    }

    private List<User> createCashiers(Store store, Branch branch, int count) {
        List<User> cashiers = new ArrayList<>();
        String[] names = {"Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", 
                         "Quinn", "Sage", "River"};
        
        for (int i = 0; i < count; i++) {
            User cashier = new User();
            cashier.setFullName(names[i % names.length] + " " + (i + 1));
            // Clean email: remove special chars and spaces, avoid double dots
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
        
        log.info("Created {} cashiers for branch: {}", count, branch.getName());
        return cashiers;
    }

    private void createMonthlyTransactionData(List<Branch> branches, 
                                             Map<Branch, List<User>> branchCashiers,
                                             List<Product> products,
                                             List<Customer> customers) {
        
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(90); // Extended to 90 days for better trends
        
        log.info("Creating transaction data from {} to {} (90 days)", startDate, endDate);
        
        for (Branch branch : branches) {
            List<User> cashiers = branchCashiers.get(branch);
            
            // Create data for each day in the past 90 days
            LocalDateTime currentDate = startDate;
            int dayIndex = 0;
            
            while (currentDate.isBefore(endDate)) {
                
                // Calculate growth factor (simulate business growth over time)
                double growthFactor = 1.0 + (dayIndex / 90.0) * 0.3; // 30% growth over 90 days
                
                // Weekend boost (Saturday and Sunday have more sales)
                double weekendMultiplier = (currentDate.getDayOfWeek().getValue() >= 6) ? 1.5 : 1.0;
                
                // Weekly pattern (mid-week dip, Friday boost)
                double weekdayMultiplier = switch (currentDate.getDayOfWeek().getValue()) {
                    case 1 -> 1.1;  // Monday - good start
                    case 2, 3 -> 0.9; // Tuesday, Wednesday - slower
                    case 4 -> 1.0;  // Thursday - average
                    case 5 -> 1.3;  // Friday - strong
                    case 6 -> 1.5;  // Saturday - peak
                    case 7 -> 1.4;  // Sunday - strong
                    default -> 1.0;
                };
                
                // Monthly pattern (end of month boost for payday)
                double monthlyMultiplier = (currentDate.getDayOfMonth() >= 25) ? 1.2 : 1.0;
                
                // Combine all factors
                double totalMultiplier = growthFactor * weekendMultiplier * weekdayMultiplier * monthlyMultiplier;
                
                // Create 2-3 shifts per day
                int shiftsPerDay = random.nextInt(2) + 2;
                
                for (int shiftNum = 0; shiftNum < shiftsPerDay; shiftNum++) {
                    User cashier = cashiers.get(random.nextInt(cashiers.size()));
                    
                    LocalDateTime shiftStart = currentDate.withHour(shiftNum == 0 ? 9 : 
                                                                   shiftNum == 1 ? 14 : 18)
                                                          .withMinute(0);
                    LocalDateTime shiftEnd = shiftStart.plusHours(shiftNum == 2 ? 3 : 5);
                    
                    // Create orders during this shift with dynamic multiplier
                    List<Order> shiftOrders = createShiftOrders(branch, cashier, products, 
                                                               customers, shiftStart, shiftEnd, totalMultiplier);
                    
                    // Create shift report
                    createShiftReport(branch, cashier, shiftOrders, shiftStart, shiftEnd);
                }
                
                currentDate = currentDate.plusDays(1);
                dayIndex++;
            }
        }
        
        log.info("Created 90 days of transaction data with realistic trends for all branches");
    }

    private List<Order> createShiftOrders(Branch branch, User cashier, List<Product> products,
                                         List<Customer> customers, LocalDateTime shiftStart, 
                                         LocalDateTime shiftEnd, double multiplier) {
        
        List<Order> orders = new ArrayList<>();
        PaymentType[] paymentTypes = PaymentType.values();
        
        // Create 10-30 orders per shift, adjusted by multiplier for realistic trends
        int baseOrderCount = random.nextInt(21) + 10;
        int orderCount = (int) Math.round(baseOrderCount * multiplier);
        
        for (int i = 0; i < orderCount; i++) {
            // Random time during shift
            long minutesInShift = java.time.Duration.between(shiftStart, shiftEnd).toMinutes();
            long randomMinutes = ThreadLocalRandom.current().nextLong(minutesInShift);
            LocalDateTime orderTime = shiftStart.plusMinutes(randomMinutes);
            
            // 70% chance customer is registered
            Customer customer = random.nextDouble() < 0.7 ? 
                customers.get(random.nextInt(customers.size())) : null;
            
            // Payment type distribution: 40% card, 35% UPI, 15% cash, 10% other
            PaymentType paymentType = getRealisticPaymentType();
            
            Order order = Order.builder()
                .branch(branch)
                .cashier(cashier)
                .customer(customer)
                .paymentType(paymentType)
                .status(OrderStatus.COMPLETED)
                .createdAt(orderTime)
                .build();
            
            // Create 1-8 items per order (weighted towards smaller orders)
            int itemCount = random.nextDouble() < 0.6 ? random.nextInt(3) + 1 : random.nextInt(6) + 3;
            List<OrderItem> orderItems = new ArrayList<>();
            double totalAmount = 0.0;
            
            // Select unique products for the order
            Set<Product> selectedProducts = new HashSet<>();
            while (selectedProducts.size() < itemCount) {
                // 60% chance to pick from top 30% of products (popular items)
                Product product = random.nextDouble() < 0.6 ? 
                    products.get(random.nextInt(Math.min(products.size(), products.size() * 3 / 10))) :
                    products.get(random.nextInt(products.size()));
                selectedProducts.add(product);
            }
            
            for (Product product : selectedProducts) {
                // Most orders have 1-2 items of each product, occasionally more
                int quantity = random.nextDouble() < 0.8 ? random.nextInt(2) + 1 : random.nextInt(4) + 1;
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

    private void createShiftReport(Branch branch, User cashier, List<Order> orders, 
                                  LocalDateTime shiftStart, LocalDateTime shiftEnd) {
        
        double totalSales = orders.stream()
            .mapToDouble(Order::getTotalAmount)
            .sum();
        
        // Create 0-2 refunds per shift (realistic refund rate ~2-5% of orders)
        int maxRefunds = Math.max(1, orders.size() / 20); // Up to 5% of orders
        int refundCount = random.nextDouble() < 0.7 ? 0 : random.nextInt(maxRefunds + 1);
        List<Refund> refunds = new ArrayList<>();
        double totalRefunds = 0.0;
        
        Set<Order> refundedOrders = new HashSet<>(); // Track to avoid duplicate refunds
        
        for (int i = 0; i < Math.min(refundCount, orders.size()); i++) {
            Order order;
            int attempts = 0;
            do {
                order = orders.get(random.nextInt(orders.size()));
                attempts++;
            } while (refundedOrders.contains(order) && attempts < 10);
            
            if (refundedOrders.contains(order)) continue;
            refundedOrders.add(order);
            
            // More realistic refund amounts: 80% full refund, 20% partial
            double refundAmount = random.nextDouble() < 0.8 ? 
                order.getTotalAmount() : 
                order.getTotalAmount() * (random.nextDouble() * 0.5 + 0.3); // 30-80% partial
            
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
        
        // Get top 5 selling products
        Map<Product, Integer> productQuantities = new HashMap<>();
        for (Order order : orders) {
            for (OrderItem item : order.getItems()) {
                productQuantities.merge(item.getProduct(), item.getQuantity(), Integer::sum);
            }
        }
        
        List<Product> topProducts = productQuantities.entrySet().stream()
            .sorted(Map.Entry.<Product, Integer>comparingByValue().reversed())
            .limit(5)
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
        shiftReport.setRecentOrders(orders.stream().limit(10).collect(Collectors.toList()));
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
        String[] streets = {"Main St", "Oak Ave", "Maple Dr", "Park Blvd", "Washington St", 
                           "Broadway", "Market St", "1st Ave", "2nd Ave", "Pine St"};
        String[] cities = {"New York", "Los Angeles", "Chicago", "Houston", "Phoenix", 
                          "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"};
        String[] states = {"NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH", "WA", "NC"};
        
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
            "Product not as described",
            "Duplicate order",
            "Quality issues",
            "Size/fit issue",
            "Better price found elsewhere"
        };
        return reasons[random.nextInt(reasons.length)];
    }

    private PaymentType getRealisticPaymentType() {
        // Realistic payment distribution
        double rand = random.nextDouble();
        if (rand < 0.40) {
            return PaymentType.CARD; // 40%
        } else if (rand < 0.75) {
            return PaymentType.UPI; // 35%
        } else {
            return PaymentType.CASH; // 25%
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
