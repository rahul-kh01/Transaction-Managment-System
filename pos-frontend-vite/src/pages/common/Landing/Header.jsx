import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { useNavigate } from 'react-router'
import { ThemeToggle } from '../../../components/theme-toggle'

// Custom GitHub Icon Component
const GithubIcon = ({ className = "w-6 h-6" }) => (
  <div
    className={`relative inline-flex items-center justify-center rounded-full p-2 
      bg-gradient-to-br from-gray-100 to-gray-200 
      dark:from-gray-800 dark:to-gray-900
      hover:from-green-100 hover:to-green-200
      dark:hover:from-green-900 dark:hover:to-green-800
      transition-all duration-300 shadow-md hover:shadow-lg ${className}`}
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-800 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  </div>
);


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const navigate = useNavigate();

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLoginButtonClick = () => {
        navigate('/auth/login');
    }
    
    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name)
    }
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm border-b' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                  <ShoppingCart className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">POS Pro</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* Features Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => toggleDropdown('features')} 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  <span>Features</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'features' && (
                  <div className="absolute left-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border border-border py-2 z-50">
                    <a href="#features" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">Overview</a>
                    <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">Inventory Management</a>
                    <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">Billing & Checkout</a>
                    <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">Analytics & Reports</a>
                  </div>
                )}
              </div>
              
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors py-2">Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors py-2">Testimonials</a>
              
              {/* Resources Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => toggleDropdown('resources')} 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'resources' && (
                  <div className="absolute left-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border border-border py-2 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">Help Center</a>
                    <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">Documentation</a>
                    <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">API Reference</a>
                    <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground">Blog</a>
                  </div>
                )}
              </div>
              
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors py-2">Contact</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://github.com/rahul-kh01/Transaction-Managment-System" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors group"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
              </a>
              <ThemeToggle />
              <Button onClick={handleLoginButtonClick} variant="outline" className="font-medium">Sign In</Button>
              <Button className="font-medium shadow-md hover:shadow-lg transition-shadow">Request Demo</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <a 
                href="https://github.com/rahul-kh01/Transaction-Managment-System" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-6 h-6 text-white" />
              </a>
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-muted-foreground hover:text-primary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border bg-background">
              <nav className="flex flex-col">
                {/* Mobile Features Dropdown */}
                <div className="py-2 border-b border-border">
                  <button 
                    onClick={() => toggleDropdown('mobile-features')} 
                    className="flex items-center justify-between w-full px-4 py-2 text-muted-foreground hover:text-primary"
                  >
                    <span>Features</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mobile-features' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === 'mobile-features' && (
                    <div className="mt-2 pl-8 space-y-2">
                      <a href="#features" className="block py-2 text-sm text-muted-foreground hover:text-primary">Overview</a>
                      <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-primary">Inventory Management</a>
                      <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-primary">Billing & Checkout</a>
                      <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-primary">Analytics & Reports</a>
                    </div>
                  )}
                </div>
                
                <a href="#pricing" className="px-4 py-4 text-muted-foreground hover:text-primary border-b border-border">Pricing</a>
                <a href="#testimonials" className="px-4 py-4 text-muted-foreground hover:text-primary border-b border-border">Testimonials</a>
                
                {/* Mobile Resources Dropdown */}
                <div className="py-2 border-b border-border">
                  <button 
                    onClick={() => toggleDropdown('mobile-resources')} 
                    className="flex items-center justify-between w-full px-4 py-2 text-muted-foreground hover:text-primary"
                  >
                    <span>Resources</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === 'mobile-resources' && (
                    <div className="mt-2 pl-8 space-y-2">
                      <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-primary">Help Center</a>
                      <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-primary">Documentation</a>
                      <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-primary">API Reference</a>
                      <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-primary">Blog</a>
                    </div>
                  )}
                </div>
                
                <a href="#contact" className="px-4 py-4 text-muted-foreground hover:text-primary border-b border-border">Contact</a>
                
                <div className="flex flex-col space-y-3 p-4">
                  <Button onClick={handleLoginButtonClick} variant="outline" className="w-full">Sign In</Button>
                  <Button className="w-full">Request Demo</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
  )
}

export default Header