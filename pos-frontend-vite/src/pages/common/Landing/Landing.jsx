import { Button } from "@/components/ui/button";
import {
  FiShoppingCart,
  FiBarChart2,
  FiUsers,
  FiShield,
  FiFileText,
  FiHome,
  FiCheckCircle,
  FiPlay,
  FiStar,
  FiArrowDown,
} from "react-icons/fi";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TrustedLogos from "./TrustedLogos";
import PricingCalculator from "./PricingCalculator";
// import FeatureComparisonSection from './FeatureComparison'
import MobileAppShowcase from "./MobileAppShowcase";
import TestimonialCarousel from "./TestimonialCarousel";
import LiveDemoSection from "./LiveDemoSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import PricingSection from "./PricingSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import KeyFeaturesSection from "./KeyFeaturesSection";
import FeatureComparisonSection from "./FeatureComparisonSection";

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navbar */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Trusted Logos Section */}
      <TrustedLogos />

      {/* Key Features Section */}
      <KeyFeaturesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Live Demo Section */}
      <LiveDemoSection />

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* Pricing Section */}
      <PricingSection />

      {/*<PricingCalculator /> */}
      <PricingCalculator />

      {/* Feature Comparison Section */}
      <FeatureComparisonSection />

      {/* Mobile App Showcase */}
      <MobileAppShowcase />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection id="contact" />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;
