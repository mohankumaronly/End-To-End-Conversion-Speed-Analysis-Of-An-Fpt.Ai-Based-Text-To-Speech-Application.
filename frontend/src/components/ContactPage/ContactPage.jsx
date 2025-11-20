import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from "lucide-react";

/**
 * ContactPage.jsx
 * - Responsive contact form (client-side validation)
 * - Contact info card + socials
 * - Mock submit -> shows success message
 *
 * Usage: add route "/contact" -> <ContactPage />
 */

const ContactPage = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
        if (!form.message.trim()) e.message = "Please write a message";
        return e;
    };

    const handleChange = (key) => (ev) => {
        setForm((p) => ({ ...p, [key]: ev.target.value }));
        setErrors((p) => ({ ...p, [key]: undefined }));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;

        setStatus("sending");

        // Mock async send
        setTimeout(() => {
            // Randomly succeed for demo (always succeed is fine)
            const ok = true;
            if (ok) {
                setStatus("success");
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: contact info */}
                <aside className="lg:col-span-1 bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Contact Us</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Have questions or need help integrating the TTS API? Send us a message and our team will reply.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-amber-500 mt-1" />
                            <div>
                                <div className="text-sm font-medium text-gray-800">Office</div>
                                <div className="text-sm text-gray-600">Bheemanna Khandre Institute of Technology, Bhalki</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-blue-700 mt-1" />
                            <div>
                                <div className="text-sm font-medium text-gray-800">Email</div>
                                <a href="mailto:support@fpt-ai.example" className="text-sm text-gray-600 hover:underline">
                                    support@fpt-ai.example
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-green-600 mt-1" />
                            <div>
                                <div className="text-sm font-medium text-gray-800">Phone</div>
                                <a href="tel:+911234567890" className="text-sm text-gray-600 hover:underline">
                                    +91 12345 67890
                                </a>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="text-sm font-medium text-gray-800 mb-2">Follow us</div>
                            <div className="flex items-center gap-3">
                                <a className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-100 hover:bg-gray-200" href="#" aria-label="Github">
                                    <Github className="w-4 h-4" />
                                </a>
                                <a className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-100 hover:bg-gray-200" href="#" aria-label="LinkedIn">
                                    <Linkedin className="w-4 h-4 text-blue-600" />
                                </a>
                                <a className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-100 hover:bg-gray-200" href="#" aria-label="Twitter">
                                    <Twitter className="w-4 h-4 text-sky-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right: form */}
                <section className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Send us a message</h3>

                        {status === "success" && (
                            <div className="mb-4 rounded-lg bg-green-50 border border-green-100 p-4 text-sm text-green-800">
                                Thanks — your message has been received. We will contact you soon.
                            </div>
                        )}

                        {status === "error" && (
                            <div className="mb-4 rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-800">
                                Oops — something went wrong. Please try again later.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Your name
                                    </label>
                                    <input
                                        id="name"
                                        value={form.name}
                                        onChange={handleChange("name")}
                                        className={`mt-1 block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${errors.name ? "border-red-300" : "border-gray-200"}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange("email")}
                                        className={`mt-1 block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${errors.email ? "border-red-300" : "border-gray-200"}`}
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Subject (optional)
                                </label>
                                <input
                                    id="subject"
                                    value={form.subject}
                                    onChange={handleChange("subject")}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                                    placeholder="Quick question about integration"
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={form.message}
                                    onChange={handleChange("message")}
                                    rows={6}
                                    className={`mt-1 block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${errors.message ? "border-red-300" : "border-gray-200"}`}
                                    placeholder="Write a short message..."
                                />
                                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition disabled:opacity-60"
                                >
                                    <Send className="w-4 h-4" />
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm({ name: "", email: "", subject: "", message: "" });
                                        setErrors({});
                                        setStatus(null);
                                    }}
                                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Map / location placeholder */}
                    <div className="mt-6 rounded-2xl overflow-hidden shadow">
                        <iframe
                            title="BKIT Bhalki location"
                            src="https://maps.google.com/maps?q=Bheemanna%20Khandre%20Institute%20of%20Technology%20Bhalki&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-56 sm:h-72 md:h-80 border-0"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ContactPage;
