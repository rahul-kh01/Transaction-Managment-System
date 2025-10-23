import {FiCheckCircle, FiBarChart2} from 'react-icons/fi'
import React from 'react'

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our POS System?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've designed our POS system with modern retailers in mind, focusing on ease of use, 
                reliability, and powerful features that drive business growth.
              </p>
              <div className="space-y-4">
                {[
                  "Easy to use interface",
                  "Works offline",
                  "GST-ready invoicing",
                  "Mobile-friendly design",
                  "24x7 Support"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FiCheckCircle  className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8">
              <div className="bg-card rounded-lg h-80 flex items-center justify-center border">
                <div className="text-center">
                  <FiBarChart2  className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Benefits Illustration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default WhyChooseUsSection