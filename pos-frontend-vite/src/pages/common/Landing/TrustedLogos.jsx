import { ShoppingBag, Building2, Carrot, Zap, Store, ShoppingCart, Briefcase, Coffee } from 'lucide-react'
import React from 'react'

const TrustedLogos = () => {
  return (
    <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Trusted by leading retailers across India
            </h2>
            <p className="text-muted-foreground">Join thousands of successful businesses using our POS system</p>
          </div>
          
          {/* Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
            {[
              { 
                name: 'SuperMart', 
                icon: <Building2 className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
                textColor: 'text-emerald-600',
                borderColor: 'border-emerald-200',
                shadowColor: 'shadow-emerald-100'
              },
              { 
                name: 'Fresh Grocery', 
                icon: <Carrot className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
                textColor: 'text-orange-600',
                borderColor: 'border-orange-200',
                shadowColor: 'shadow-orange-100'
              },
              { 
                name: 'City Mall', 
                icon: <ShoppingBag className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
                textColor: 'text-blue-600',
                borderColor: 'border-blue-200',
                shadowColor: 'shadow-blue-100'
              },
              { 
                name: 'Express Retail', 
                icon: <Zap className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
                textColor: 'text-purple-600',
                borderColor: 'border-purple-200',
                shadowColor: 'shadow-purple-100'
              },
              { 
                name: 'Metro Stores', 
                icon: <Store className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600',
                textColor: 'text-pink-600',
                borderColor: 'border-pink-200',
                shadowColor: 'shadow-pink-100'
              },
              { 
                name: 'Quick Mart', 
                icon: <ShoppingCart className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
                textColor: 'text-amber-600',
                borderColor: 'border-amber-200',
                shadowColor: 'shadow-amber-100'
              },
              { 
                name: 'Business Hub', 
                icon: <Briefcase className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
                textColor: 'text-indigo-600',
                borderColor: 'border-indigo-200',
                shadowColor: 'shadow-indigo-100'
              },
              { 
                name: 'Café Chain', 
                icon: <Coffee className="w-6 h-6" />,
                bgColor: 'bg-gradient-to-br from-teal-500 to-teal-600',
                textColor: 'text-teal-600',
                borderColor: 'border-teal-200',
                shadowColor: 'shadow-teal-100'
              }
            ].map((brand) => (
              <div key={brand.name} className="group">
                <div className={`h-20 bg-card rounded-xl border-2 ${brand.borderColor} shadow-lg ${brand.shadowColor} hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 p-4`}>
                  <div className={`w-10 h-10 ${brand.bgColor} rounded-lg flex items-center justify-center shadow-md`}>
                    <div className="text-white">
                      {brand.icon}
                    </div>
                  </div>
                  <span className={`font-bold text-sm ${brand.textColor} group-hover:scale-105 transition-transform duration-200`}>
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '5,000+', label: 'Active Users' },
              { number: '₹100M+', label: 'Monthly Sales' },
              { number: '25+', label: 'States Covered' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default TrustedLogos