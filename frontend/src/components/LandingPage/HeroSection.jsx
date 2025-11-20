import React from 'react'
import CTAPanel from './CTAPanel'
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="bg-linear-to-b from-blue-50 to-white pt-16 pb-16 md:pb-24 rounded-b-3xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            The Most <span className="text-blue-800">Natural Voice</span> in Southeast Asia.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg lg:max-w-none mx-auto lg:mx-0">
            Instantly convert text into lifelike speech in multiple languages, with specific focus on high-fidelity Vietnamese and regional tones, using cutting-edge FPT AI deep learning models.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/auth">
              <button className="text-center px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-bold text-white bg-blue-800 rounded-full hover:bg-blue-900 transition duration-300 shadow-xl shadow-blue-800/40 transform hover:-translate-y-px cursor-pointer">
                Start Integrating Now
              </button>
            </Link>
            <a href="https://fpt.ai/" target="_blank" rel="noopener noreferrer" className="text-center px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-medium text-blue-800 bg-white border border-blue-200 rounded-full hover:bg-blue-50 transition duration-300 shadow-md">
              View API Docs
            </a>
          </div>
        </div>
        <div className="lg:col-span-6 mt-12 lg:mt-0">
          <CTAPanel />
        </div>
      </div>
    </div>
  </section>
)

export default HeroSection
