// Mock data for shift summary
export const mockShiftData = {
  cashier: 'John Cashier',
  shiftStart: new Date(2023, 8, 15, 9, 0),
  shiftEnd: new Date(2023, 8, 15, 17, 0),
  totalOrders: 24,
  totalSales: 5680.00,
  totalRefunds: 350.00,
  netSales: 5330.00,
  paymentSummary: [
    { method: 'cash', amount: 2450.00, count: 10 },
    { method: 'card', amount: 1850.00, count: 8 },
    { method: 'upi', amount: 1380.00, count: 6 },
  ],
  topSellingItems: [
    { id: 1, name: 'Parle-G Biscuits', quantity: 28, amount: 280.00 },
    { id: 6, name: 'Dairy Milk Chocolate', quantity: 22, amount: 880.00 },
    { id: 3, name: 'Coca Cola 500ml', quantity: 18, amount: 630.00 },
    { id: 7, name: 'Maggi Noodles', quantity: 15, amount: 210.00 },
    { id: 5, name: 'Lays Classic', quantity: 14, amount: 280.00 },
  ],
  recentOrders: [
    { id: 'ORD-024', time: new Date(2023, 8, 15, 16, 45), amount: 155.00, paymentMode: 'upi' },
    { id: 'ORD-023', time: new Date(2023, 8, 15, 16, 30), amount: 210.00, paymentMode: 'card' },
    { id: 'ORD-022', time: new Date(2023, 8, 15, 16, 15), amount: 95.00, paymentMode: 'cash' },
    { id: 'ORD-021', time: new Date(2023, 8, 15, 16, 0), amount: 180.00, paymentMode: 'cash' },
    { id: 'ORD-020', time: new Date(2023, 8, 15, 15, 45), amount: 350.00, paymentMode: 'card' },
  ],
  refunds: [
    { id: 'REF-002', orderId: 'ORD-015', time: new Date(2023, 8, 15, 14, 30), amount: 120.00, reason: 'Damaged product' },
    { id: 'REF-001', orderId: 'ORD-008', time: new Date(2023, 8, 15, 11, 15), amount: 230.00, reason: 'Customer changed mind' },
  ]
}; 