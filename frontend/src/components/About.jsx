import React from 'react'

const About = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='w-4/5 flex items-center justify-center'>
                <div className='p-10'>
                    <h1 className='font-semibold text-5xl my-10'>
                        The most realistic voice AI platform
                    </h1>
                    <h2 className='font-bold my-6'>
                        AI voice models and products powering millions of developers, creators, and enterprises. From <br />low‑latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.
                    </h2>
                    <div className='flex items-center justify-center'>
                        <button className='bg-black px-4 py-2 text-white font-bold rounded-full mx-4 cursor-pointer'>SING UP</button>
                        <button className='bg-gray-200 px-4 py-2 rounded-full cursor-pointer'>Try Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About