import React from "react";
import PricingCalculator from "./PricingCalculator";
import { CheckCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";

const pricingPlans = [
  {
    name: "Basic",
    price: "₹999",
    period: "/month",
    features: [
      "Single store",
      "Basic reporting",
      "Email support",
      "Mobile app",
      "Unlimited products",
      "Cloud backup",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹1,999",
    period: "/month",
    features: [
      "Multi-store",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Staff management",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited stores",
      "Dedicated support",
      "Custom development",
      "White-label options",
      "On-premise deployment",
      "SLA guarantee",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground">
            Flexible pricing plans designed for businesses of all sizes
          </p>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"> */}
          {/* <div className="lg:col-span-12"> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-2xl p-8 shadow-lg border ${
                    plan.popular ? "ring-2 ring-primary relative" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular ? "" : "variant-outline"
                    }`}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Start Trial"}
                  </Button>
                </div>
              ))}
            </div>
          {/* </div> */}

       
        {/* </div> */}

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="inline-flex items-center space-x-2 bg-primary/5 rounded-full px-4 py-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">
              100% money-back guarantee for 30 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
