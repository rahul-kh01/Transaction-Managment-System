import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {FiShoppingCart, FiBarChart2, FiUsers, FiUser, FiPackage, FiCalendar, FiSettings, FiChevronRight, FiPlay, FiPause} from 'react-icons/fi';

const LiveDemoSection = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const tabs = [
    { id: 'pos', label: 'POS Terminal', icon: <FiShoppingCart  className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2  className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <FiPackage  className="w-5 h-5" /> },
    { id: 'customers', label: 'Customers', icon: <FiUser className="w-5 h-5" /> },
  ];

  const features = {
    pos: [
      'Intuitive touchscreen interface',
      'Fast barcode scanning',
      'Quick product search',
      'Customizable hotkeys',
      'Multiple payment methods',
      'Receipt customization'
    ],
    analytics: [
      'Real-time sales dashboard',
      'Product performance metrics',
      'Employee performance tracking',
      'Custom report generation',
      'Data export options',
      'Visual data representation'
    ],
    inventory: [
      'Real-time stock tracking',
      'Low stock alerts',
      'Automated reordering',
      'Supplier management',
      'Stock transfer between stores',
      'Batch and expiry tracking'
    ],
    customers: [
      'Customer profiles',
      'Purchase history',
      'Loyalty program integration',
      'Automated marketing',
      'Customer segmentation',
      'Feedback collection'
    ]
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="grid grid-cols-20 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border-r border-t border-gray-900"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See It <span className="text-primary">In Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our intuitive interface and powerful features through our interactive demo
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Demo Tabs */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Features</h3>
            
            <div className="space-y-3 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${activeTab === tab.id ? 'text-white' : 'text-primary'}`}>
                      {tab.icon}
                    </div>
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <FiChevronRight  className="w-5 h-5" />}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Key Features:</h4>
              <ul className="space-y-2">
                {features[activeTab].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <Button className="w-full group">
                Request Full Demo
                <FiChevronRight  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Right Side - Demo Display */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Demo Header */}
              <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium">
                    {activeTab === 'pos' && 'POS Terminal - Checkout'}
                    {activeTab === 'analytics' && 'Analytics Dashboard'}
                    {activeTab === 'inventory' && 'Inventory Management'}
                    {activeTab === 'customers' && 'Customer Management'}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={togglePlayback}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
                  >
                    {isPlaying ? <FiPause  className="w-4 h-4" /> : <FiPlay  className="w-4 h-4" />}
                  </button>
                  <div className="text-xs text-gray-300">{isPlaying ? 'Demo Playing' : 'Click to Play'}</div>
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="p-6 h-[500px] overflow-hidden relative">
                {activeTab === 'pos' && (
                  <div className="h-full">
                    <div className="grid grid-cols-12 gap-4 h-full">
                      {/* Left Side - Products */}
                      <div className="col-span-8 flex flex-col">
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <div className="flex space-x-2">
                            <input type="text" className="flex-1 p-2 border border-gray-300 rounded" placeholder="Search products..." />
                            <button className="bg-primary text-white p-2 rounded">Scan</button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3 overflow-y-auto flex-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center hover:border-primary hover:shadow-md transition-all cursor-pointer">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                                <div className="w-8 h-8 rounded bg-primary/20"></div>
                              </div>
                              <p className="text-xs font-medium text-gray-900 mb-1">Product {i + 1}</p>
                              <p className="text-xs text-gray-500">₹{((i + 1) * 99).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Side - Cart */}
                      <div className="col-span-4 bg-gray-50 rounded-lg p-4 flex flex-col">
                        <div className="mb-3 pb-3 border-b border-gray-200">
                          <h3 className="font-medium text-gray-900 mb-1">Current Sale</h3>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Items: 3</span>
                            <span className="text-gray-500">Total: ₹547.00</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto mb-4">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between py-2 border-b border-gray-200">
                              <div>
                                <p className="text-sm font-medium">Product {item}</p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <span>₹{(item * 99).toFixed(2)}</span>
                                  <span>×</span>
                                  <span>{item}</span>
                                </div>
                              </div>
                              <p className="font-medium">₹{(item * item * 99).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-medium">₹547.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Tax (18%)</span>
                            <span className="font-medium">₹98.46</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>₹645.46</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">Hold</Button>
                          <Button size="sm">Pay Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'analytics' && (
                  <div className="h-full">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {['Today\'s Sales', 'Weekly Revenue', 'Monthly Growth'].map((title, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">{title}</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {i === 0 ? '₹12,450' : i === 1 ? '₹86,320' : '+18.5%'}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${i === 2 ? 'bg-green-500' : 'bg-primary'}`} 
                                style={{ width: `${i === 0 ? 65 : i === 1 ? 80 : 85}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="col-span-2 bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-medium">Sales Overview</h3>
                          <div className="flex space-x-2">
                            <button className="text-xs bg-primary text-white px-2 py-1 rounded">Weekly</button>
                            <button className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Monthly</button>
                          </div>
                        </div>
                        <div className="h-48 flex items-end space-x-2">
                          {[35, 55, 40, 70, 85, 60, 30].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-primary/80 rounded-t" 
                                style={{ height: `${height}%` }}
                              ></div>
                              <p className="text-xs mt-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium mb-4">Top Categories</h3>
                        <div className="space-y-4">
                          {['Electronics', 'Clothing', 'Groceries', 'Home Goods'].map((category, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{category}</span>
                                <span>{[32, 28, 21, 19][i]}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-primary" 
                                  style={{ width: `${[32, 28, 21, 19][i]}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium">Recent Transactions</h3>
                        <button className="text-xs text-primary">View All</button>
                      </div>
                      <div className="grid grid-cols-4 text-xs text-gray-500 mb-2">
                        <span>Order ID</span>
                        <span>Customer</span>
                        <span>Amount</span>
                        <span>Status</span>
                      </div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="grid grid-cols-4 py-2 border-t border-gray-200">
                          <span className="text-sm">#ORD-{1000 + i}</span>
                          <span className="text-sm">Customer {i}</span>
                          <span className="text-sm">₹{(i * 450).toFixed(2)}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 inline-block text-center w-20">
                            Completed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'inventory' && (
                  <div className="h-full">
                    <div className="flex space-x-4 mb-6">
                      <div className="flex-1">
                        <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Search inventory..." />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Filter</Button>
                        <Button size="sm">+ Add Product</Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-5 gap-4">
                        {['Total Products', 'In Stock', 'Low Stock', 'Out of Stock', 'Categories'].map((title, i) => (
                          <div key={i} className="bg-white rounded-lg p-3 text-center">
                            <p className="text-sm text-gray-500 mb-1">{title}</p>
                            <p className="text-xl font-bold text-gray-900">
                              {i === 0 ? '1,245' : i === 1 ? '1,100' : i === 2 ? '95' : i === 3 ? '50' : '32'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-6 bg-gray-100 p-3 text-sm font-medium text-gray-700">
                        <div>Product</div>
                        <div>SKU</div>
                        <div>Category</div>
                        <div>Price</div>
                        <div>Stock</div>
                        <div>Actions</div>
                      </div>
                      
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-6 p-3 border-t border-gray-200 items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-100 rounded flex-shrink-0"></div>
                            <span className="text-sm font-medium">Product {i + 1}</span>
                          </div>
                          <div className="text-sm text-gray-600">SKU-{1000 + i}</div>
                          <div className="text-sm text-gray-600">
                            {['Electronics', 'Clothing', 'Groceries', 'Home Goods', 'Toys'][i]}
                          </div>
                          <div className="text-sm">₹{((i + 1) * 499).toFixed(2)}</div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded-full ${i === 3 ? 'bg-red-100 text-red-800' : i === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {i === 3 ? 'Out of stock' : i === 2 ? 'Low stock' : `${(i + 1) * 25} in stock`}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <FiSettings  className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-primary hover:text-primary-dark">
                              <FiPackage  className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'customers' && (
                  <div className="h-full">
                    <div className="flex space-x-4 mb-6">
                      <div className="flex-1">
                        <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Search customers..." />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Filter</Button>
                        <Button size="sm">+ Add Customer</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {['Total Customers', 'New This Month', 'Repeat Customers', 'Avg. Spend'].map((title, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">{title}</p>
                          <p className="text-xl font-bold text-gray-900">
                            {i === 0 ? '3,542' : i === 1 ? '128' : i === 2 ? '68%' : '₹1,250'}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-6 bg-gray-100 p-3 text-sm font-medium text-gray-700">
                        <div>Customer</div>
                        <div>Email</div>
                        <div>Phone</div>
                        <div>Total Spent</div>
                        <div>Last Purchase</div>
                        <div>Actions</div>
                      </div>
                      
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-6 p-3 border-t border-gray-200 items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium">
                              {['RK', 'PS', 'AP', 'SK', 'MJ'][i]}
                            </div>
                            <span className="text-sm font-medium">
                              {['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Kapoor', 'Mohit Jain'][i]}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">customer{i + 1}@example.com</div>
                          <div className="text-sm text-gray-600">+91 98765 4{i}210</div>
                          <div className="text-sm">₹{((i + 1) * 2500).toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{['Today', '2 days ago', '1 week ago', '2 weeks ago', '1 month ago'][i]}</div>
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <FiUser className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-primary hover:text-primary-dark">
                              <FiCalendar  className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Demo Overlay - Shown when not playing */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <div className="text-center">
                      <button 
                        onClick={togglePlayback}
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors mb-4 mx-auto"
                      >
                        <FiPlay  className="w-6 h-6 text-white" />
                      </button>
                      <p className="text-white text-lg font-medium">Click to Play Interactive Demo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-500 mb-4">Want to see more? Schedule a personalized demo with our team.</p>
              <Button variant="outline" size="lg">
                Book a Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;