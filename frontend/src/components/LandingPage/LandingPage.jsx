import React from 'react'
import Header from './Header' 
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import HowItWorksSection from './HowItWorksSection'
import ReviewsSection from './ReviewsSection'
import FAQSection from './FAQSection'
import Footer from './Footer'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            < Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <ReviewsSection />
                <FAQSection />
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage