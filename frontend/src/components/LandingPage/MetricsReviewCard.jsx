import React from 'react'
import { Zap } from 'lucide-react'

const MetricsReviewCard = ({ metric, metricLabel, detail, source }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col border-t-8 border-amber-500 transition duration-300 hover:shadow-2xl hover:scale-[1.01]">
    <Zap className="w-8 h-8 md:w-10 md:h-10 text-amber-500 mb-4" />
    <p className="text-6xl md:text-7xl font-extrabold text-blue-800 mb-2">{metric}</p>
    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{metricLabel}</h3>
    <p className="text-sm md:text-base text-gray-600 flex-grow mb-4">{detail}</p>
    <span className="text-xs md:text-sm text-gray-500 font-medium">— {source}</span>
  </div>
)

export default MetricsReviewCard
