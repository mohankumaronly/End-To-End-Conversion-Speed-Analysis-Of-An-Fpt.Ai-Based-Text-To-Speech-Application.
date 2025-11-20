import React from "react";
import { Linkedin, Github, Mail, ExternalLink } from "lucide-react";
import ImageDeveloper1 from "../../images/developer1.jpg";
import CollegeImage from "../../images/collegeImage.jpg";

/**
 * Redesigned DevelopersPage
 * - Modern hero
 * - Glassy profile cards with hover lift
 * - Skill chips
 * - Large college banner with CTA
 *
 * Replace images in /src/images as needed.
 */

const DEVELOPERS = [
    {
        id: 1,
        name: "A. Developer",
        role: "Frontend Engineer",
        bio: "Crafts responsive UIs and accessible interactions using React and Tailwind.",
        img: ImageDeveloper1,
        github: "#",
        linkedin: "#",
        email: "dev1@example.com",
        skills: ["React", "Tailwind", "TypeScript"],
    },
    {
        id: 2,
        name: "B. Developer",
        role: "Backend Engineer",
        bio: "Builds robust APIs, authentication and cloud deployments with Java Spring Boot.",
        img: ImageDeveloper1,
        github: "#",
        linkedin: "#",
        email: "dev2@example.com",
        skills: ["Spring Boot", "SQL", "Docker"],
    },
    {
        id: 3,
        name: "C. Developer",
        role: "ML / TTS Engineer",
        bio: "Works on voice models, fine-tuning and inference pipelines for natural TTS.",
        img: ImageDeveloper1,
        github: "#",
        linkedin: "#",
        email: "dev3@example.com",
        skills: ["Python", "PyTorch", "TTS"],
    },
    {
        id: 4,
        name: "D. Developer",
        role: "Full-stack Engineer",
        bio: "Connects frontend & backend, CI/CD, and performance optimizations.",
        img: ImageDeveloper1,
        github: "#",
        linkedin: "#",
        email: "dev4@example.com",
        skills: ["Node", "React", "Kubernetes"],
    },
];

const College = {
    name: "Bheemanna Khandre Institute of Technology, Bhalki",
    desc:
        "An institute offering engineering programs and a supportive campus community. Visit the official website for admissions and course details.",
    img: CollegeImage,
    website: "https://www.recbhalki.org/",
};

const IconButton = ({ href, label, children }) => (
    <a
        href={href || "#"}
        target={href && href !== "#" ? "_blank" : undefined}
        rel={href && href !== "#" ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-white transition shadow-sm"
    >
        {children}
    </a>
);

export default function DevelopersPage() {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            {/* HERO */}
            <header className="max-w-7xl mx-auto text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Meet the Team
                </h1>
                <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                    The core engineers building the FPT AI Voice project.
                </p>
            </header>

            {/* DEVELOPERS GRID */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {DEVELOPERS.map((dev) => (
                    <article
                        key={dev.id}
                        className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center border border-slate-100 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
                    >
                        {/* avatar */}
                        <div className="relative -mt-12 mb-4">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                                <img
                                    src={dev.img}
                                    alt={`${dev.name} avatar`}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900">{dev.name}</h3>
                        <p className="text-sm text-amber-600 font-medium mt-1">{dev.role}</p>

                        <p className="mt-3 text-sm text-slate-600 flex-1">{dev.bio}</p>

                        {/* skills */}
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                            {dev.skills.map((s) => (
                                <span
                                    key={s}
                                    className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* social */}
                        <div className="mt-4 flex items-center gap-3">
                            <IconButton href={dev.github} label={`${dev.name} Github`}>
                                <Github className="w-4 h-4 text-slate-700" />
                            </IconButton>
                            <IconButton href={dev.linkedin} label={`${dev.name} LinkedIn`}>
                                <Linkedin className="w-4 h-4 text-blue-600" />
                            </IconButton>
                            <IconButton href={`mailto:${dev.email}`} label={`Email ${dev.name}`}>
                                <Mail className="w-4 h-4 text-rose-500" />
                            </IconButton>
                        </div>
                    </article>
                ))}
            </section>

            {/* COLLEGE BANNER */}
            <section className="max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto">
                        <img
                            src={College.img}
                            alt={`${College.name} campus`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="md:w-2/3 p-6 flex flex-col justify-center gap-4">
                        <h2 className="text-2xl font-bold text-slate-900">{College.name}</h2>
                        <p className="text-slate-600 max-w-2xl">{College.desc}</p>

                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            <a
                                href={College.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
                            >
                                Visit College Website <ExternalLink className="w-4 h-4" />
                            </a>

                            <button
                                onClick={() => alert("More alumni and resources will be added soon (mock).")}
                                className="px-3 py-2 text-sm text-slate-600 underline"
                            >
                                More resources (coming soon)
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
