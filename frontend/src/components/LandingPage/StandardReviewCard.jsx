import React from 'react'
import { User } from 'lucide-react'

const StandardReviewCard = ({ quote, name, title }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col border-t-8 border-blue-800 transition duration-300 hover:shadow-2xl hover:scale-[1.01]">
    <div className="flex items-center mb-4">
      <User className="w-10 h-10 p-1.5 md:w-12 md:h-12 md:p-2 rounded-full bg-blue-100 text-blue-800 mr-4" />
      <div>
        <p className="font-bold text-gray-900 text-base md:text-lg">{name}</p>
        <p className="text-xs md:text-sm text-gray-500">{title}</p>
      </div>
    </div>
    <p className="italic text-gray-700 leading-relaxed text-base flex-grow">
      "{quote}"
    </p>
  </div>
)

export default StandardReviewCard
