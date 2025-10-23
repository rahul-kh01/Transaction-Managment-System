import React, { useState, useEffect, useCallback } from 'react';
import {FiChevronLeft, FiChevronRight, FiStar, FiMessageCircle} from 'react-icons/fi';
import { Button } from '@/components/ui/button';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      position: 'Owner, Metro Retail',
      image: '/testimonial-1.jpg', // These would be actual images in production
      content: 'Implementing this POS system has transformed our business operations. The inventory management features alone have saved us countless hours and reduced errors by 35%.',
      rating: 5,
      businessType: 'Supermarket',
      employeeCount: '50+',
      yearsSince: 2
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'Manager, Café Chain',
      image: '/testimonial-2.jpg',
      content: 'The customer management features have helped us build stronger relationships with our regulars. We can now personalize our service based on purchase history and preferences.',
      rating: 5,
      businessType: 'Restaurant',
      employeeCount: '25-50',
      yearsSince: 1.5
    },
    {
      id: 3,
      name: 'Vikram Singh',
      position: 'Director, Business Hub',
      image: '/testimonial-3.jpg',
      content: `'The analytics dashboard gives us real-time insights that have been crucial for our decision-making. We've optimized our product offerings and increased revenue by 28% in just six months.'`,
      rating: 4,
      businessType: 'Electronics',
      employeeCount: '10-25',
      yearsSince: 1
    },
    {
      id: 4,
      name: 'Ananya Patel',
      position: 'CEO, Quick Mart',
      image: '/testimonial-4.jpg',
      content: 'The multi-store management capability has been a game-changer for our expanding business. We can now efficiently manage inventory across locations while maintaining centralized control.',
      rating: 5,
      businessType: 'Convenience Store',
      employeeCount: '100+',
      yearsSince: 3
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Businesses <span className="text-primary">Like Yours</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See what our customers have to say about how our POS system has transformed their businesses.
          </p>
        </div>

        <div className="relative">
          {/* Large Quote Icon */}
          <div className="absolute -top-10 -left-10 text-primary/10">
            <FiMessageCircle  className="w-32 h-32" />
          </div>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 relative z-10 h-full">
                    <div className="flex flex-col md:flex-row gap-8 h-full">
                      {/* Left Column - Image and Info */}
                      <div className="md:w-1/3 flex flex-col items-center md:items-start">
                        <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative">
                            {/* This would be an actual image in production */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                              {testimonial.name.charAt(0)}
                            </div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1">
                            <FiMessageCircle  className="w-4 h-4" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 text-center md:text-left">{testimonial.name}</h3>
                        <p className="text-gray-600 mb-4 text-center md:text-left">{testimonial.position}</p>
                        
                        <div className="flex items-center space-x-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FiStar  
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-500 mb-6">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Business:</span>
                            <span>{testimonial.businessType}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Team Size:</span>
                            <span>{testimonial.employeeCount} employees</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Using for:</span>
                            <span>{testimonial.yearsSince} {testimonial.yearsSince === 1 ? 'year' : 'years'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Content */}
                      <div className="md:w-2/3 flex flex-col justify-center">
                        <div className="text-lg md:text-xl text-gray-700 italic mb-6 relative">
                          <p>"{testimonial.content}"</p>
                        </div>
                        
                        <div className="mt-auto">
                          <Button variant="outline" size="sm" className="text-primary hover:text-primary-dark">
                            Read Full Story
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-primary w-8' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:left-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-primary transition-colors z-20"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft  className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-primary transition-colors z-20"
            aria-label="Next testimonial"
          >
            <FiChevronRight  className="w-6 h-6" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">98%</p>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">₹2.5M+</p>
            <p className="text-gray-600">Revenue Processed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">24/7</p>
            <p className="text-gray-600">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;