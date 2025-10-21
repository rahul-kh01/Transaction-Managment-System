import React from 'react';
import { CheckCircle, X, HelpCircle } from 'lucide-react';

const FeatureComparisonTable = () => {
  // Feature categories and their features
  const featureCategories = [
    {
      name: 'Core POS Features',
      features: [
        { name: 'Barcode Scanning', basic: true, pro: true, enterprise: true },
        { name: 'Receipt Printing', basic: true, pro: true, enterprise: true },
        { name: 'Product Management', basic: true, pro: true, enterprise: true },
        { name: 'Customer Database', basic: true, pro: true, enterprise: true },
        { name: 'Offline Mode', basic: true, pro: true, enterprise: true },
      ]
    },
    {
      name: 'Advanced Features',
      features: [
        { name: 'Multi-store Management', basic: false, pro: true, enterprise: true },
        { name: 'Advanced Reporting', basic: false, pro: true, enterprise: true },
        { name: 'Inventory Forecasting', basic: false, pro: true, enterprise: true },
        { name: 'Staff Management', basic: false, pro: true, enterprise: true },
        { name: 'API Access', basic: false, pro: true, enterprise: true },
      ]
    },
    {
      name: 'Enterprise Features',
      features: [
        { name: 'White Labeling', basic: false, pro: false, enterprise: true },
        { name: 'Custom Development', basic: false, pro: false, enterprise: true },
        { name: 'On-premise Deployment', basic: false, pro: false, enterprise: true },
        { name: 'SLA Guarantee', basic: false, pro: false, enterprise: true },
        { name: 'Dedicated Account Manager', basic: false, pro: false, enterprise: true },
      ]
    },
  ];

  // Helper function to render feature availability indicator
  const renderAvailability = (available) => {
    if (available === true) {
      return <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />;
    } else if (available === false) {
      return <X className="w-5 h-5 text-gray-300 mx-auto" />;
    } else {
      return <HelpCircle className="w-5 h-5 text-gray-400 mx-auto" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-4 px-6 text-left text-gray-600 font-medium">Features</th>
            <th className="py-4 px-6 text-center text-gray-600 font-medium w-1/5">
              <div className="text-lg font-bold text-gray-900">Basic</div>
              <div className="text-sm font-normal">₹999/month</div>
            </th>
            <th className="py-4 px-6 text-center text-gray-600 font-medium w-1/5 bg-primary/5">
              <div className="text-lg font-bold text-primary">Pro</div>
              <div className="text-sm font-normal">₹1,999/month</div>
            </th>
            <th className="py-4 px-6 text-center text-gray-600 font-medium w-1/5">
              <div className="text-lg font-bold text-gray-900">Enterprise</div>
              <div className="text-sm font-normal">Custom Pricing</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {featureCategories.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              {/* Category Header */}
              <tr className="bg-gray-50">
                <td 
                  colSpan="4" 
                  className="py-3 px-6 text-left font-semibold text-gray-800 border-t border-b border-gray-200"
                >
                  {category.name}
                </td>
              </tr>
              
              {/* Features */}
              {category.features.map((feature, featureIndex) => (
                <tr 
                  key={featureIndex} 
                  className={`hover:bg-gray-50 ${featureIndex === category.features.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <td className="py-4 px-6 text-left text-gray-700 border-b border-gray-100">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center border-b border-gray-100">
                    {renderAvailability(feature.basic)}
                  </td>
                  <td className="py-4 px-6 text-center border-b border-gray-100 bg-primary/5">
                    {renderAvailability(feature.pro)}
                  </td>
                  <td className="py-4 px-6 text-center border-b border-gray-100">
                    {renderAvailability(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          
          {/* Support Section */}
          <tr className="bg-gray-50">
            <td 
              colSpan="4" 
              className="py-3 px-6 text-left font-semibold text-gray-800 border-t border-b border-gray-200"
            >
              Support
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-4 px-6 text-left text-gray-700 border-b border-gray-100">Email Support</td>
            <td className="py-4 px-6 text-center border-b border-gray-100">Business Hours</td>
            <td className="py-4 px-6 text-center border-b border-gray-100 bg-primary/5">24/7</td>
            <td className="py-4 px-6 text-center border-b border-gray-100">24/7 Priority</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-4 px-6 text-left text-gray-700 border-b border-gray-100">Phone Support</td>
            <td className="py-4 px-6 text-center border-b border-gray-100">
              <X className="w-5 h-5 text-gray-300 mx-auto" />
            </td>
            <td className="py-4 px-6 text-center border-b border-gray-100 bg-primary/5">Business Hours</td>
            <td className="py-4 px-6 text-center border-b border-gray-100">24/7</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-4 px-6 text-left text-gray-700 border-b border-gray-100">Response Time</td>
            <td className="py-4 px-6 text-center border-b border-gray-100">48 hours</td>
            <td className="py-4 px-6 text-center border-b border-gray-100 bg-primary/5">24 hours</td>
            <td className="py-4 px-6 text-center border-b border-gray-100">4 hours</td>
          </tr>
        </tbody>
      </table>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        For a complete list of features, please contact our sales team.
      </div>
    </div>
  );
};

export default FeatureComparisonTable;