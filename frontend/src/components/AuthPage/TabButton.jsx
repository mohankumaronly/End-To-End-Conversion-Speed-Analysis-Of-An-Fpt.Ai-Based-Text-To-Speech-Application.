import React from 'react'

const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={`pb-3 text-lg font-semibold transition-colors duration-200 ${isActive ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default TabButton
