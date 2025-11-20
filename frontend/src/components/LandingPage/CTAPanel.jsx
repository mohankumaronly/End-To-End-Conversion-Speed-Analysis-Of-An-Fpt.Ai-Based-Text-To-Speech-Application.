import React from 'react'
import { ArrowRight } from 'lucide-react'
import CheckCircleIcon from './CheckCircleIcon'
import { Link } from "react-router-dom";

const CTAPanel = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-4 border-blue-200 flex flex-col justify-center min-h-[250px] md:min-h-[300px]">
      <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
        Ready to Integrate?
      </h3>
      <p className="text-lg text-gray-600 mb-6">
        Access 50+ regional and international voices via our powerful, scalable API.
      </p>
      <ul className="space-y-3 mb-8 text-gray-700">
        <li className="flex items-center text-sm md:text-base font-medium">
          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Real-time synthesis (low latency)
        </li>
        <li className="flex items-center text-sm md:text-base font-medium">
          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Full SSML support for control
        </li>
        <li className="flex items-center text-sm md:text-base font-medium">
          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Competitive, usage-based pricing
        </li>
      </ul>
      <Link
        to="/auth"
        className="flex items-center justify-center w-full md:w-auto px-6 py-3 text-lg font-bold text-white bg-amber-500 rounded-full hover:bg-amber-600 transition duration-300 shadow-xl shadow-amber-500/40 transform hover:-translate-y-px group"
      >
        Get Started with the API
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  )
}

export default CTAPanel
