import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, CheckCircle, ArrowRight } from 'lucide-react';

const MobileAppShowcase = () => {
  const appFeatures = [
    'Real-time sales tracking',
    'Inventory management on the go',
    'Push notifications for low stock',
    'Mobile receipt generation',
    'Customer management',
    'Offline functionality'
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-primary/5"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
              <span>Mobile App</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Take Your Business <span className="text-primary">Anywhere</span> With Our Mobile App
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Our mobile app gives you the freedom to manage your business from anywhere. 
              Check sales, update inventory, and stay connected with your team—all from your smartphone.
            </p>
            
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Download for iOS
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                Download for Android
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[280px] h-[580px] bg-gray-900 rounded-[40px] p-3 shadow-2xl relative z-10 overflow-hidden">
                {/* Inner Bezel */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-black rounded-t-[37px] z-20">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl z-30"></div>
                </div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                  {/* App Header */}
                  <div className="bg-primary text-white p-4 pt-14">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">POS Pro</h3>
                        <p className="text-xs opacity-80">Dashboard</p>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Today's Sales</p>
                        <p className="text-lg font-bold text-gray-900">₹12,450</p>
                        <p className="text-xs text-green-500">+8% from yesterday</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Orders</p>
                        <p className="text-lg font-bold text-gray-900">48</p>
                        <p className="text-xs text-green-500">+5 new today</p>
                      </div>
                    </div>
                    
                    {/* Recent Orders */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm">Recent Orders</h4>
                        <p className="text-xs text-primary">View All</p>
                      </div>
                      
                      {/* Order Items */}
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white border border-gray-100 rounded-lg p-3 mb-2 shadow-sm">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-xs font-medium">Order #{1000 + item}</p>
                              <p className="text-xs text-gray-500">2 mins ago</p>
                            </div>
                            <p className="text-sm font-bold">₹{(item * 450).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Quick Actions */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {['New Sale', 'Inventory', 'Reports'].map((action, i) => (
                          <div key={i} className="bg-gray-50 p-2 rounded-lg text-center">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
                              <div className="w-4 h-4 bg-primary rounded-md"></div>
                            </div>
                            <p className="text-xs">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-2 flex justify-around">
                    {['Home', 'Sales', 'Products', 'More'].map((item, i) => (
                      <div key={i} className={`p-2 rounded-md ${i === 0 ? 'bg-primary/10' : ''}`}>
                        <div className={`w-5 h-5 mx-auto ${i === 0 ? 'bg-primary' : 'bg-gray-300'} rounded-md`}></div>
                        <p className={`text-[10px] mt-1 text-center ${i === 0 ? 'text-primary font-medium' : 'text-gray-500'}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-0"></div>
            </div>
            
            {/* QR Code */}
            <div className="absolute -right-4 bottom-20 bg-white p-4 rounded-xl shadow-lg transform rotate-3 z-20">
              <div className="w-24 h-24 bg-gray-200 mb-2 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-800 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white"></div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-center font-medium">Scan to download</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppShowcase;