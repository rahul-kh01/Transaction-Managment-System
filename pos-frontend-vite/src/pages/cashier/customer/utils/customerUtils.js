// Filter customers based on search term
export const filterCustomers = (customers, searchTerm) => {
  if (!searchTerm) return customers;
  
  const searchLower = searchTerm.toLowerCase();
  return customers.filter(customer => 
    customer.name?.toLowerCase().includes(searchLower) || 
    customer.fullName?.toLowerCase().includes(searchLower) || 
    customer.phone?.includes(searchTerm) || 
    customer.email?.toLowerCase().includes(searchLower)
  );
};

// Calculate customer statistics from orders
export const calculateCustomerStats = (orders) => {
  if (!orders || orders.length === 0) {
    return {
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0
    };
  }

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const averageOrderValue = totalSpent / totalOrders;

  return {
    totalOrders,
    totalSpent,
    averageOrderValue
  };
};

// Validate customer data
export const validateCustomer = (customer) => {
  const errors = [];
  
  if (!customer.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!customer.phone?.trim()) {
    errors.push('Phone number is required');
  }
  
  if (customer.email && !isValidEmail(customer.email)) {
    errors.push('Invalid email format');
  }
  
  return errors;
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate points input
export const validatePoints = (points) => {
  if (!points || points <= 0) {
    return 'Please enter a valid number of points to add';
  }
  return null;
};

// Format customer data for display
export const formatCustomerData = (customer) => {
  return {
    id: customer.id,
    name: customer.name || 'Unknown Customer',
    phone: customer.phone || 'N/A',
    email: customer.email || 'N/A',
    loyaltyPoints: customer.loyaltyPoints || 0,
    totalOrders: customer.totalOrders || 0,
    totalSpent: customer.totalSpent || 0,
    lastVisit: customer.lastVisit ? new Date(customer.lastVisit) : null
  };
}; 