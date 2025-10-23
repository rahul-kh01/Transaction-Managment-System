import {FiBarChart3} from 'react-icons/fi'
import {FiShield} from 'react-icons/fi'
import {FiHome} from 'react-icons/fi'
import {FiFileText} from 'react-icons/fi'
import {FiUsers} from 'react-icons/fi'
import {FiShoppingCart} from 'react-icons/fi'
import React from 'react'

const FetureSection = () => {
  return (
    <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Store
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive POS system includes all the features modern retailers need to succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiShoppingCart  className="w-8 h-8" />,
                title: "Barcode Scanning & Billing",
                description: "Lightning-fast barcode scanning with instant product lookup and billing"
              },
              {
                icon: <FiBarChart3  className="w-8 h-8" />,
                title: "Inventory & Stock Management",
                description: "Real-time inventory tracking with low stock alerts and automated reordering"
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Customer & Employee Profiles",
                description: "Comprehensive profiles for customers and role-based employee management"
              },
              {
                icon: <FiShield  className="w-8 h-8" />,
                title: "Role-Based Access Control",
                description: "Secure access control with customizable permissions for different staff roles"
              },
              {
                icon: <FiFileText  className="w-8 h-8" />,
                title: "Sales Reporting",
                description: "Detailed analytics and reports to track performance and growth"
              },
              {
                icon: <FiHome  className="w-8 h-8" />,
                title: "Multi-store Management",
                description: "Manage multiple locations from a single dashboard with centralized control"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FetureSection