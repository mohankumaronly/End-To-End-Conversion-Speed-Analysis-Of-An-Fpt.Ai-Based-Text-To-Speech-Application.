import React from 'react'
import { ChevronDown } from 'lucide-react'

const AccordionItem = ({ title, content, isOpen, onClick, id }) => (
  <div className="bg-gray-50 rounded-lg shadow-md border border-gray-200">
    <button
      className="w-full text-left p-4 md:p-5 flex justify-between items-center focus:outline-none"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`content-${id}`}
      id={`button-${id}`}
    >
      <span className="font-semibold text-base md:text-lg text-gray-800">{title}</span>
      <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-blue-800 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
    </button>
    <div
      id={`content-${id}`}
      role="region"
      aria-labelledby={`button-${id}`}
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-4 pt-0 md:p-5 md:pt-0' : 'max-h-0 opacity-0'}`}
    >
      {isOpen && <p className="text-sm md:text-base text-gray-600 border-t border-gray-200 pt-4 md:pt-5">{content}</p>}
    </div>
  </div>
)

export default AccordionItem
