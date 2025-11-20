import React, { useState } from "react";
import { Check, X, Star, Info, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * PricingPage component
 * - Monthly/Yearly toggle
 * - 3 tiers: Free, Pro, Enterprise
 * - Free plan navigates to /home
 * - Other plans open "Coming Soon" modal
 *
 * Usage: add route "/pricing" -> <PricingPage />
 */

const TIERS = [
    {
        id: "free",
        title: "Free",
        subtitle: "Hobby & testing",
        monthly: 0,
        yearly: 0,
        features: ["5000 characters / mo", "Shared standard voices", "Community support"],
        ctaLabel: "Get started",
        best: false,
    },
    {
        id: "pro",
        title: "Pro",
        subtitle: "For creators & devs",
        monthly: 19,
        yearly: 168, // discounted yearly
        features: ["100k characters / mo", "Priority voices + accents", "Priority email support", "API access"],
        ctaLabel: "Subscribe",
        best: true,
    },
    {
        id: "enterprise",
        title: "Enterprise",
        subtitle: "Large teams & integrations",
        monthly: 199,
        yearly: 1990,
        features: ["Custom quota & SLAs", "Dedicated voice tuning", "SAML / SSO", "Priority onboarding"],
        ctaLabel: "Contact Sales",
        best: false,
    },
];

const Price = ({ value, period }) =>
    value === 0 ? (
        <div className="text-3xl font-extrabold">
            Free
            <div className="text-sm font-medium text-gray-500 mt-1">{period}</div>
        </div>
    ) : (
        <div className="text-3xl font-extrabold">
            ${value}
            <span className="text-lg font-medium text-gray-500">/{period}</span>
        </div>
    );

const FeatureRow = ({ text }) => (
    <li className="flex items-start gap-3 text-sm text-gray-700">
        <Check className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
        <span>{text}</span>
    </li>
);

const ComingSoonModal = ({ open, onClose, tier }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="comingSoonTitle"
        >
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-center mb-4">
                    <Zap className="w-7 h-7 text-amber-500 mr-3" />
                    <h3 id="comingSoonTitle" className="text-xl font-bold">
                        Subscription coming soon
                    </h3>
                </div>

                <p className="text-gray-700 mb-4">
                    The <strong>{tier?.title ?? "selected plan"}</strong> subscription flow is currently under active development.
                    We’re putting the final touches on billing and security — it will be available very soon.
                </p>

                <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-green-500" /> Early access when ready</li>
                    <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-green-500" /> Email notification when launched</li>
                    <li className="flex gap-2 items-start"><Info className="w-4 h-4 text-blue-500" /> Contact sales for immediate enterprise needs</li>
                </ul>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => { onClose(); alert("We'll notify you by email (mock)."); }}
                        className="px-4 py-2 rounded-md bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
                    >
                        Notify me
                    </button>
                </div>
            </div>
        </div>
    );
};

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState("monthly"); // monthly | yearly
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState(null);
    const navigate = useNavigate();

    const handleSubscribe = (tier) => {
        // If you later integrate billing, replace this with real flow.
        setSelectedTier(tier);
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
                        <Zap className="w-7 h-7 text-amber-500" /> Pricing Plans
                    </h1>
                    <p className="mt-2 text-gray-600">Pick a plan that fits your needs. Billing UI is being built — subscribe will be available soon.</p>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mt-6">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-4 py-2 rounded-full font-semibold transition ${billingCycle === "monthly" ? "bg-white shadow-md text-gray-900" : "text-gray-600"}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-4 py-2 rounded-full font-semibold transition ${billingCycle === "yearly" ? "bg-white shadow-md text-gray-900" : "text-gray-600"}`}
                        >
                            Yearly (save)
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {TIERS.map((tier) => {
                        const price = billingCycle === "monthly" ? tier.monthly : tier.yearly;
                        const period = billingCycle === "monthly" ? "mo" : "yr";

                        return (
                            <div key={tier.id} className={`bg-white rounded-2xl p-6 shadow-lg border ${tier.best ? "border-amber-200" : "border-gray-100"}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            {tier.title}
                                            {tier.best && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Popular</span>}
                                        </h3>
                                        <p className="text-sm text-gray-500">{tier.subtitle}</p>
                                    </div>
                                    <div className="text-right">
                                        <Price value={price} period={period} />
                                    </div>
                                </div>

                                <ul className="mb-6 space-y-3">
                                    {tier.features.map((f, i) => <FeatureRow key={i} text={f} />)}
                                </ul>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            if (tier.id === "free") {
                                                // Free plan -> navigate to /home
                                                navigate("/home");
                                            } else {
                                                handleSubscribe(tier);
                                            }
                                        }}
                                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold transition ${tier.id === "free" ? "bg-blue-700 hover:bg-blue-800" : "bg-amber-500 hover:bg-amber-600"}`}
                                    >
                                        {tier.ctaLabel}
                                    </button>

                                    {/* Small secondary action */}
                                    <button
                                        onClick={() => alert("Feature list (mock): We'll add more details soon.")}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        <Info className="w-4 h-4 text-gray-500" /> Learn more
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 text-center text-sm text-gray-500">
                    <p>
                        Need a custom plan? <button onClick={() => alert("Contact sales (mock)")} className="text-blue-600 underline">Contact sales</button>.
                    </p>
                </div>
            </div>

            <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} tier={selectedTier} />
        </div>
    );
};

export default PricingPage;
