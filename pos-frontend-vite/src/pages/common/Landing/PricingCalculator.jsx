import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FiTool, FiHome, FiUsers, FiShoppingCart, FiArrowRight } from 'react-icons/fi';

const PricingCalculator = () => {
  const [storeCount, setStoreCount] = useState(1);
  const [employeeCount, setEmployeeCount] = useState(5);
  const [transactionVolume, setTransactionVolume] = useState('medium');
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  
  // Calculate price based on inputs
  useEffect(() => {
    // Base price per store
    const basePrice = 999;
    
    // Store multiplier (with volume discount)
    let storeMultiplier = storeCount;
    if (storeCount > 5) storeMultiplier = storeCount * 0.9; // 10% discount for >5 stores
    if (storeCount > 10) storeMultiplier = storeCount * 0.8; // 20% discount for >10 stores
    
    // Employee factor
    const employeeFactor = Math.min(1 + (employeeCount - 5) * 0.02, 1.5); // Max 50% increase
    
    // Transaction volume factor
    const volumeFactors = {
      low: 0.8,
      medium: 1.0,
      high: 1.2,
      enterprise: 1.5
    };
    
    // Calculate raw price
    const rawPrice = basePrice * storeMultiplier * employeeFactor * volumeFactors[transactionVolume];
    
    // Calculate savings (difference between raw calculation without discounts)
    const noDiscountPrice = basePrice * storeCount * employeeFactor * volumeFactors[transactionVolume];
    const calculatedSavings = noDiscountPrice - rawPrice;
    
    // Round to nearest 99
    const roundedPrice = Math.ceil(rawPrice / 100) * 100 - 1;
    
    setTotalPrice(roundedPrice);
    setSavings(Math.round(calculatedSavings));
  }, [storeCount, employeeCount, transactionVolume]);
  
  return (

    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
       <div className=" dark:bg-[#303030] rounded-2xl shadow-xl overflow-hidden ">
      <div className="bg-primary/10 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <FiTool className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-gray-900">Pricing Calculator</h3>
        </div>
        <p className="text-gray-600">Estimate your monthly subscription based on your business needs</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Store Count Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <FiHome className="w-4 h-4 mr-2" /> Number of Stores
            </label>
            <span className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
              {storeCount} {storeCount === 1 ? 'store' : 'stores'}
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={storeCount} 
            onChange={(e) => setStoreCount(parseInt(e.target.value))} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20+</span>
          </div>
        </div>
        
        {/* Employee Count Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <FiUsers className="w-4 h-4 mr-2" /> Number of Employees
            </label>
            <span className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
              {employeeCount} {employeeCount === 1 ? 'employee' : 'employees'}
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={employeeCount} 
            onChange={(e) => setEmployeeCount(parseInt(e.target.value))} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>10</span>
            <span>25</span>
            <span>40</span>
            <span>50+</span>
          </div>
        </div>
        
        {/* Transaction Volume */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
            <FiShoppingCart className="w-4 h-4 mr-2" /> Transaction Volume
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'enterprise', label: 'Enterprise' }
            ].map((option) => (
              <button
                key={option.value}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  transactionVolume === option.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTransactionVolume(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Price Display */}
        <div className="dark:text-white rounded-xl p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 dark:text-white">Estimated Monthly Price:</span>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">₹{totalPrice.toLocaleString()}</div>
              {savings > 0 && (
                <div className="text-sm text-green-600">You save ₹{savings.toLocaleString()}</div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            Price includes all features, unlimited transactions, and 24/7 support.
            Annual billing available with 2 months free.
          </div>
          
          <Button className="w-full group">
            Get Custom Quote
            <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default PricingCalculator;