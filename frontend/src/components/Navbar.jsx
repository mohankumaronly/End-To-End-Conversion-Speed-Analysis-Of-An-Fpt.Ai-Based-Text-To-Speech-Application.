import React from 'react'

const Navbar = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='flex items-center justify-between p-5 w-4/5'>
                <h1 className='font-bold text-xl'>
                    FPT AI TTS
                </h1>
                <div>
                    <a href="#" className='px-4 font-semibold'>Home</a>
                    <a href="#" className='px-4 font-semibold'>About</a>
                    <a href="#" className='px-4 font-semibold'>Contact</a>
                </div>
                <div>
                    <button className='mx-3'>Login</button>
                    <button className='bg-black text-white px-3 py-1 rounded-2xl mx-3'>SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar