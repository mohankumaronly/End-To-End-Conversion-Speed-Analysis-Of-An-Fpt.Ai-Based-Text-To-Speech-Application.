import React from 'react'
import StepCard from './StepCard'
import { FileText, Brain, Music } from 'lucide-react'

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-16 md:py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12 md:mb-16">
        The Science of Sound: How FPT AI brings text to life.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <StepCard 
          number={1}
          title="Input & Selection"
          description="Provide text, specify language (Vietnamese accents supported), and select a synthetic voice profile via the API."
          icon={FileText}
        />
        <StepCard 
          number={2}
          title="Deep Engine Processing"
          description="FPT AI’s proprietary deep neural network analyzes linguistic features, context, and desired emotion."
          icon={Brain}
        />
        <StepCard 
          number={3}
          title="Instant Audio Output"
          description="The synthesized voice is rendered in high-quality audio (MP3/WAV) and delivered in real-time."
          icon={Music}
        />
      </div>
    </div>
  </section>
)

export default HowItWorksSection
