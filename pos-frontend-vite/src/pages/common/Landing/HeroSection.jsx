import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { FiPlay, FiArrowRight, FiX, FiCheckCircle, FiShoppingCart, FiBarChart2, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router";
import { TypewriterText } from "./components";

const HeroSection = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const handleGetStartedClick = () => {
    navigate('/auth/onboarding');
  }
  
  const handleWatchDemo = () => {
    setShowVideo(true);
  }
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/20 to-transparent"></div>
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-primary/5"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-6 animate-pulse">
            New Feature: Multi-store Management Now Available
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span 
              className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Powerful POS System For
            </span>
            <br />
            <TypewriterText
              text="Malls, Supermarkets & Retail Chains"
              speed={80}
              delay={1500}
              className="text-primary bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent"
              showCursor={true}
              cursorBlink={true}
            />
          </h1>
          <p 
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Manage billing, inventory, staff, and reports—all in one system.
            Streamline your operations and boost your business growth.
          </p>
          
          {/* Feature Highlights */}
          <div 
            className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: '1.6s' }}
          >
            {[
              { icon: <FiShoppingCart className="w-4 h-4" />, text: "Fast Checkout" },
              { icon: <FiBarChart2 className="w-4 h-4" />, text: "Real-time Analytics" },
              { icon: <FiShield className="w-4 h-4" />, text: "Secure Access" },
              { icon: <FiCheckCircle className="w-4 h-4" />, text: "GST Ready" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-1 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm shadow-sm border animate-fade-in-up hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${1.8 + index * 0.1}s` }}
              >
                <span className="text-primary">{feature.icon}</span>
                <span className="text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '2.2s' }}
          >
            <Button 
              onClick={handleGetStartedClick} 
              size="lg" 
              className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-subtle"
            >
              Get Started
              <FiArrowRight className="w-5 h-5 ml-2"/>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 hover:bg-primary/5 transition-all duration-300"
              onClick={handleWatchDemo}
            >
              Watch Demo Video
              <FiPlay className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Hero Image/Video */}
        <div 
          className="mt-16 relative animate-fade-in-up"
          style={{ animationDelay: '2.6s' }}
        >
          <div className="bg-card rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden border">
            {showVideo ? (
              <div className="relative">
                <button 
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
                <div className="bg-black rounded-lg">
                  <video
                    autoPlay
                    controls
                    className="w-full h-full max-h-[500px] object-cover"
                    src="https://videos.pexels.com/video-files/3970167/3970167-uhd_2560_1440_30fps.mp4"
                  ></video>
                </div>
              </div>
            ) : (
              <div className="relative group cursor-pointer" onClick={handleWatchDemo}>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="bg-card/90 rounded-full p-4 shadow-lg transform transition-transform group-hover:scale-110 border">
                    <FiPlay className="w-8 h-8 text-primary" fill="currentColor" />
                  </div>
                </div>
                <img 
                  src="/pos-mockup.svg" 
                  alt="POS System Interface" 
                  className="w-full h-auto rounded-lg shadow-inner"
                />
              </div>
            )}
          </div>
          
          {/* Stats Overlay */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 w-full max-w-3xl px-4">
            {[
              { number: "5,000+", label: "Active Users" },
              { number: "₹100M+", label: "Monthly Sales" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="flex-1 bg-card rounded-xl shadow-lg p-4 flex items-center justify-center border animate-fade-in-up hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${3.0 + index * 0.2}s` }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
