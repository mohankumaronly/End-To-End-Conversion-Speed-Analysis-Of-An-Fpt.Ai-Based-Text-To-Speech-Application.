import React from 'react'

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-extrabold text-amber-500 mb-4">FPT AI Voice</h3>
          <p className="text-gray-400 text-sm">Innovating regional voice technology.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Documentation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Pricing</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Case Studies</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Careers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Contact</a></li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-1">
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-500">&copy; 2025 FPT AI Voice. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default Footer
