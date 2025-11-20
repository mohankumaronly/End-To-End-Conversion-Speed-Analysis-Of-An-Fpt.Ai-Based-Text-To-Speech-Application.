import React from 'react'
import StandardReviewCard from './StandardReviewCard'
import MetricsReviewCard from './MetricsReviewCard'

const ReviewsSection = () => (
  <section id="reviews" className="py-16 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
        Customer Success Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StandardReviewCard
          quote="The FPT AI voice quality is simply unmatched, especially for the nuanced tones required in the Vietnamese banking sector. Our IVR system has seen a 40% boost in user satisfaction."
          name="Dr. Nguyen T."
          title="CTO, TechBank Group"
        />
        <MetricsReviewCard
          metric="99%"
          metricLabel="Tone & Context Accuracy"
          detail="We achieved near-perfect accuracy in speech tone and context, eliminating the 'robotic' sound that plagued our previous vendor. This is a game-changer."
          source="J. Lee, Head of Customer Experience, Telco Solutions"
        />
        <StandardReviewCard
          quote="We used the FPT AI API to add voice narration to 10,000 product descriptions in under 48 hours. The simplicity of the integration was astounding."
          name="Tran H."
          title="Head of Digital, E-Commerce Express"
        />
      </div>
    </div>
  </section>
)

export default ReviewsSection
