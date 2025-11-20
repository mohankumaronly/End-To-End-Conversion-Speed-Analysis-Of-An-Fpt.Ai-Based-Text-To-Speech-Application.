import React from "react";
import { Book, Github, Terminal, Code, FolderTree, Server, Layers } from "lucide-react";

/**
 * Documentation Page
 * MERN STACK ONLY – No Java, no Spring Boot
 * Looks like a GitHub README but as a webpage
 */

const DocumentationPage = () => {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">

                {/* HEADER */}
                <header className="mb-10 text-center">
                    <Book className="w-12 h-12 mx-auto text-blue-700" />
                    <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
                        FPT AI Voice – Documentation
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Open-source Text-to-Speech Dashboard built using the MERN Stack.
                    </p>
                </header>

                {/* ABOUT PROJECT */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">📌 About the Project</h2>
                    <p className="text-gray-700 leading-relaxed">
                        FPT AI Voice is an open-source **Text-to-Speech (TTS)** platform designed for developers,
                        students, and creators.
                        This project includes:
                    </p>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-2">
                        <li>Modern, responsive UI built with React + Tailwind</li>
                        <li>TTS Dashboard with prompt, speed, voice selection</li>
                        <li>History of generated audio (mock for now)</li>
                        <li>Fully designed Pricing, Developers, Contact, and Error pages</li>
                        <li>Authentication UI (login/register)</li>
                        <li>MERN backend ready to integrate TTS APIs</li>
                    </ul>
                </section>

                {/* TECH STACK */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Layers className="w-6 h-6 text-amber-500" /> Tech Stack (MERN)
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* FRONTEND */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">🎨 Frontend</h3>
                            <ul className="ml-6 list-disc text-gray-700 space-y-1">
                                <li>React (Vite)</li>
                                <li>Tailwind CSS + Responsive design</li>
                                <li>React Router</li>
                                <li>Lucide React Icons</li>
                            </ul>
                        </div>

                        {/* BACKEND */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">⚙ Backend</h3>
                            <ul className="ml-6 list-disc text-gray-700 space-y-1">
                                <li>Node.js</li>
                                <li>Express.js</li>
                                <li>MongoDB + Mongoose</li>
                                <li>REST API architecture</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* PROJECT STRUCTURE */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FolderTree className="w-6 h-6 text-green-600" /> Folder Structure
                    </h2>

                    <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm overflow-auto shadow-lg">
                        {`fpt-ai-voice/
│
├── client/   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/   # Node + Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   └── package.json
│
└── README.md`}
                    </pre>
                </section>

                {/* HOW TO CLONE */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Github className="w-6 h-6 text-black" /> Clone the Project
                    </h2>

                    <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm overflow-auto shadow-lg">
                        {`git clone https://github.com/your-username/fpt-ai-voice.git
cd fpt-ai-voice`}
                    </pre>
                </section>

                {/* INSTALL FRONTEND */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Terminal className="w-6 h-6 text-blue-600" /> Install & Run Frontend
                    </h2>

                    <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm overflow-auto shadow-lg">
                        {`cd client
npm install
npm run dev`}
                    </pre>
                </section>

                {/* INSTALL BACKEND */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Server className="w-6 h-6 text-purple-600" /> Install & Run Backend (Node + Express)
                    </h2>

                    <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm overflow-auto">
                        {`cd server
npm install
npm start`}
                    </pre>

                    <p className="text-gray-600 mt-3">
                        Make sure MongoDB is running locally or update your <code>.env</code> with a cloud MongoDB URI.
                    </p>
                </section>

                {/* CONTRIBUTION */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">🤝 Contributions</h2>
                    <p className="text-gray-700 leading-relaxed">
                        This project is fully open-source.
                        You're welcome to:
                    </p>

                    <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
                        <li>Submit pull requests</li>
                        <li>Open issues</li>
                        <li>Add new components</li>
                        <li>Improve backend / frontend</li>
                    </ul>
                </section>

                {/* LICENSE */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">📜 License</h2>
                    <p className="text-gray-600">MIT License – free for personal & commercial use.</p>
                </section>

            </div>
        </main>
    );
};

export default DocumentationPage;
