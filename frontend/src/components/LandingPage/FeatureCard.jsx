import React from 'react'

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-2xl hover:border-blue-300">
    <div className="flex items-center mb-4">
      <Icon className="w-7 h-7 text-blue-800 mr-3 shrink-0" />
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
)

export default FeatureCard
