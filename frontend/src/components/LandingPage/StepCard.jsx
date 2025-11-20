import React from 'react'

const StepCard = ({ number, title, description, icon: Icon }) => (
  <div className="text-center group p-6 rounded-xl transition duration-300 hover:bg-white hover:shadow-2xl hover:scale-[1.03] transform hover:border-b-4 hover:border-blue-500">
    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center text-3xl font-bold mb-4 border-4 border-blue-800/20 group-hover:bg-blue-800 group-hover:text-white transition duration-300">
      <Icon className="w-7 h-7 md:w-8 md:h-8" />
    </div>
    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{number}. {title}</h3>
    <p className="text-sm md:text-base text-gray-600">{description}</p>
  </div>
)

export default StepCard
