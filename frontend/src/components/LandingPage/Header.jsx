import { Link } from "react-router-dom";
import { LogIn } from 'lucide-react';

const Header = () => (
  <header className="sticky top-0 z-50 bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">

        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="#" className="text-2xl font-extrabold text-blue-800">
            FPT <span className="text-amber-500">AI</span> Voice
          </a>
        </div>

        <nav className="hidden md:flex space-x-6 lg:space-x-10">
          <a className="text-base font-medium text-gray-600 hover:text-blue-800">Features</a>
          <a className="text-base font-medium text-gray-600 hover:text-blue-800">How It Works</a>
          <a className="text-base font-medium text-gray-600 hover:text-blue-800">Reviews</a>
          <a className="text-base font-medium text-gray-600 hover:text-blue-800">FAQ</a>
        </nav>

        <div className="flex items-center justify-end md:flex-1 lg:w-0">
          <Link
            to="/auth"
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg text-sm md:text-base font-medium text-white bg-blue-800 hover:bg-blue-900 transition flex items-center"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login / Register
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
