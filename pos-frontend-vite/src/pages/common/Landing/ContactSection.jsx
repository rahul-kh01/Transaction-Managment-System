import React from 'react';
import { Button } from '@/components/ui/button';
import {FiPhone, FiMail, FiMapPin, FiClock, FiArrowRight, FiCheckCircle} from 'react-icons/fi';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-white"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Streamline Your Store?
              </h2>
              <p className="text-xl opacity-90">
                Join thousands of retailers who trust our POS system to grow their business
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" 
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" 
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" 
                      placeholder="+91 8079035103"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input 
                      type="text" 
                      id="business" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" 
                      placeholder="Your business name"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">I'm interested in</label>
                  <select 
                    id="interest" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
                  >
                    <option value="">Select an option</option>
                    <option value="demo">Scheduling a demo</option>
                    <option value="pricing">Pricing information</option>
                    <option value="trial">Starting a free trial</option>
                    <option value="question">General question</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" 
                    placeholder="Tell us about your business needs"
                  ></textarea>
                </div>
                
                <Button className="w-full py-3 text-lg group">
                  Send Message
                  <FiArrowRight  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Right Side - Contact Info */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FiPhone  className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <p className="opacity-90">+91 8079035103</p>
                    <p className="opacity-90">+91 98765 43211</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FiMail  className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="opacity-90">rahulkhandelwal.tech19@gmail.com</p>
                    <p className="opacity-90">rahulkhandelwal.tech19@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FiMapPin  className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Office Address</p>
                    <p className="opacity-90">123 Tech Park, Whitefield</p>
                    <p className="opacity-90">Bangalore, Karnataka 560066</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FiClock  className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Business Hours</p>
                    <p className="opacity-90">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p className="opacity-90">Saturday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiCheckCircle  className="w-6 h-6 text-white flex-shrink-0" />
                <span>Free personalized demo</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheckCircle  className="w-6 h-6 text-white flex-shrink-0" />
                <span>14-day free trial with full features</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheckCircle  className="w-6 h-6 text-white flex-shrink-0" />
                <span>Dedicated onboarding specialist</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheckCircle  className="w-6 h-6 text-white flex-shrink-0" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;