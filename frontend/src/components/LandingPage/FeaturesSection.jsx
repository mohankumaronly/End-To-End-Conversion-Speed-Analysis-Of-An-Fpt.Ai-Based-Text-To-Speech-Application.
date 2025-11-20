import React from 'react'
import FeatureCard from './FeatureCard'
import { Code, BookOpen, Cloud, Shield, ChevronDown } from 'lucide-react'

const FeaturesSection = () => (
  <section id="features" className="py-16 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
        Technical Differentiators & Control
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={Code}
          title="Full SSML Markup"
          description="Gain granular control over pronunciation, pitch, speed, and emphasis using Speech Synthesis Markup Language."
        />
        <FeatureCard
          icon={BookOpen}
          title="Custom Dictionaries"
          description="Define proprietary terminology or unique names to ensure consistent, correct, and regional-specific pronunciation."
        />
        <FeatureCard
          icon={Cloud}
          title="Enterprise Scalability"
          description="Designed for high-volume, concurrent requests with guaranteed high availability and extremely low, reliable latency."
        />
        <FeatureCard
          icon={Shield}
          title="Data Security & Privacy"
          description="Fully compliant infrastructure ensures your data input and generated audio remain secure and private according to global standards."
        />
      </div>
      <div className="text-center mt-12">
        <a href="#how-it-works" className="text-lg font-medium text-blue-800 hover:text-blue-600 transition duration-150 flex items-center justify-center">
          See How It Works Below
        <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
        </a>
      </div>
    </div>
  </section>
)

export default FeaturesSection
