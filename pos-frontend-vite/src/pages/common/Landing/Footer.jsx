import React from 'react';
import {FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiMail, FiArrowRight} from 'react-icons/fi';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card text-card-foreground border-t">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-foreground font-bold text-xl">POSPro</span>
            </div>
            <p className="mb-4 text-muted-foreground max-w-md">
              Empowering retailers with smart point-of-sale solutions that streamline operations, 
              boost sales, and enhance customer experiences.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FiFacebook  className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FiTwitter  className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FiInstagram  className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FiLinkedin  className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FiYoutube  className="h-5 w-5" />
              </a>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-foreground font-medium mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-background text-foreground px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary flex-grow border border-input"
                />
                <Button className="rounded-l-none">
                  <FiArrowRight  className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-foreground font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Download App</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Partners</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-foreground font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail  className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">support@pospro.com</span>
              </li>
              <li className="text-muted-foreground">
                <p>123 Tech Park, Whitefield</p>
                <p>Bangalore, Karnataka 560066</p>
              </li>
              <li className="text-muted-foreground">
                <p>+91 98765 43210</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-muted-foreground">
              <p>&copy; {currentYear} POSPro. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;