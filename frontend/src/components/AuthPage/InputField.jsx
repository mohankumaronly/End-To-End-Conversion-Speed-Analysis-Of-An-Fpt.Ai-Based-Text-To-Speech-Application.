import React from 'react'

const InputField = ({ icon: Icon, type = 'text', placeholder, value, onChange, label, hint }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <div className="relative flex items-center border border-gray-300 rounded-xl focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all shadow-sm">
      <div className="absolute left-4 text-gray-400">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none bg-white"
        aria-label={placeholder || label}
      />
    </div>
    {hint && <p className="text-xs text-gray-500 mt-1 pl-1">{hint}</p>}
  </div>
)

export default InputField
