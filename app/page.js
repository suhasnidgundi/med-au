import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-4xl text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Med AI: Your Virtual Doctor</h1>
                    <p className="text-xl">AI-driven medical consultation for underserved communities</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-8 text-center">How Med AI Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            title="Symptom Analysis"
                            description="Advanced AI algorithms analyze your symptoms through an intuitive chat interface."
                        />
                        <FeatureCard
                            title="Accurate Diagnosis"
                            description="Our AI uses machine learning models trained on vast medical datasets to provide accurate diagnoses."
                        />
                        <FeatureCard
                            title="Medical Data Integration"
                            description="We integrate with existing medical databases and securely store your medical history for personalized care."
                        />
                        <FeatureCard
                            title="Accessibility"
                            description="Access Med AI through our mobile app or voice-based system, designed for all communities."
                        />
                        <FeatureCard
                            title="Healthcare Provider Collaboration"
                            description="Our system collaborates with real doctors for complex cases and specialist referrals."
                        />
                        <FeatureCard
                            title="Ethics and Data Security"
                            description="We prioritize patient privacy and employ state-of-the-art encryption for data security."
                        />
                        <FeatureCard
                            title="Follow-Up Care"
                            description="Automated follow-ups and seamless referrals to specialists when needed."
                        />
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose Med AI?</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <ul className="list-disc pl-6 space-y-4">
                            <li>24/7 availability for instant medical consultations</li>
                            <li>Reduced waiting times and travel expenses</li>
                            <li>Personalized health recommendations based on your medical history</li>
                            <li>Seamless integration with local healthcare providers for comprehensive care</li>
                            <li>Multilingual support to serve diverse communities</li>
                            <li>Continuous learning and improvement of our AI models</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-8 text-center">Get Started with Med AI</h2>
                    <div className="text-center">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Try Med AI Now
                        </button>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Med AI. All rights reserved.</p>
                    <p className="mt-2">Empowering healthcare through artificial intelligence.</p>
                </div>
            </footer>
        </div>
    );
}