import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4 sm:p-6 font-sans">

            <div
                className="
          bg-white 
          w-full 
          max-w-xl 
          p-8 
          sm:p-12 
          rounded-3xl 
          shadow-2xl 
          border-top-4 
          border-t-4
          border-red-600 
          text-center 
          flex 
          flex-col 
          items-center
          transition-all 
          duration-300
        "
            >

                <AlertTriangle size={100} strokeWidth={2} className="text-red-600 mb-6" />

                <h1
                    className="
            text-7xl 
            sm:text-9xl 
            font-extrabold 
            text-red-600 
            mb-4 
            leading-none
          "
                >
                    404
                </h1>

                <h2
                    className="
            text-2xl 
            sm:text-3xl 
            font-bold 
            text-gray-800 
            mb-6
          "
                >
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-10 max-w-sm">
                    Oops! The voice synthesizer seems to have lost the script for this page.
                    It looks like you've followed a broken link or entered a URL that doesn't exist.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="
            flex 
            items-center 
            justify-center 
            px-8 
            py-3 
            bg-blue-600 
            text-white 
            font-semibold 
            rounded-xl 
            shadow-lg 
            hover:bg-blue-700 
            transition 
            duration-150 
            ease-in-out
            transform 
            hover:scale-[1.02]
          "
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Go Back Home
                </button>

            </div>
        </div>
    );
};

export default ErrorPage;
