import React from 'react'
import FeatureComparisonTable from './FeatureComparisonTable'
import { ArrowDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'

const FeatureComparisonSection = () => {
  return (
     <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Compare Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See which plan is right for your business needs
            </p>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg p-6 border">
            <FeatureComparisonTable />
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" className="group">
              View All Features
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
  )
}

export default FeatureComparisonSection