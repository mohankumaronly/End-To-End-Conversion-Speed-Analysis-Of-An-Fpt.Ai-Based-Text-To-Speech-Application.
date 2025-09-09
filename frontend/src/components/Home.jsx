import React from 'react'

const Home = () => {
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
                    <div>
                        <h1 className='font-semibold'>
                            Example Prompts
                        </h1>
                        <h2 className='p-4  bg-gray-100 m-4 rounded-2xl cursor-pointer'>
                            Hello Iam FPT AI I can Generate the text to speech downloadable audio
                        </h2>
                        <h2 className='p-4  bg-gray-100 m-4 rounded-2xl cursor-pointer'>
                            programming language are the just differ in the syntax the logic ramain same in every programming languages
                        </h2>
                        <h2 className='p-4  bg-gray-100 m-4 rounded-2xl cursor-pointer'>
                            learning the new is the good try be productive
                        </h2>
                        <h2 className='p-4  bg-gray-100 m-4 rounded-2xl cursor-pointer'>
                            text is speech website are really good
                        </h2>
                    </div>
                    <div className='flex items-center justify-center my-10'>
                        <textarea
                            placeholder="Enter text..."
                            className="w-full h-40 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        ></textarea>
                    </div>
                    <div className='flex items-center'>
                        <button className='bg-black text-white px-4 py-2 rounded-full cursor-pointer mx-4'>Generate</button>
                        <div className='bg-gray-300 px-4 py-2 rounded-full cursor-pointer'>
                            <h1>Download</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home