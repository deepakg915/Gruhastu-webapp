import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, MessageSquare, Sparkles, Sprout, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1920"
                        alt="Spiritual Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>

                <div className="container relative z-20">
                    <motion.div variants={itemVariants} className="max-w-3xl">
                        <span className="inline-block bg-orange-100 text-primary-saffron px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-6">
                            Welcome to the Sanatana Path
                        </span>
                        <h1 className="text-7xl font-bold text-deep-maroon leading-tight mb-8">
                            Hindu Wisdom for the <span className="text-primary-saffron">Modern Soul</span>
                        </h1>
                        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                            Grihastu simplifies tradition. We don't just tell you what to do; we help you understand <strong>why</strong> it matters today.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/stories" className="btn-primary py-4 px-10 text-lg flex items-center gap-2">
                                Explore Epics <ArrowRight size={20} />
                            </Link>
                            <Link to="/chatbot" className="bg-white border-2 border-primary-saffron text-primary-saffron py-4 px-10 rounded-full font-bold hover:bg-orange-50 transition-colors flex items-center gap-2 text-lg">
                                Talk to AI Guru <MessageSquare size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container">
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-deep-maroon mb-4">Deep Dive into Tradition</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to integrate ancient wisdom into your daily lifestyle.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BookOpen className="text-primary-saffron" size={40} />}
                            title="Epic Stories"
                            desc="The Ramayana, Mahabharata, and Puranas decoded for the modern audience."
                            link="/stories"
                        />
                        <FeatureCard
                            icon={<Sparkles className="text-primary-saffron" size={40} />}
                            title="Daily Shlokas"
                            desc="Meaningful stotras and chants to elevate your spiritual vibration."
                            link="/stotras"
                        />
                        <FeatureCard
                            icon={<Sprout className="text-primary-saffron" size={40} />}
                            title="Vedic Lifestyle"
                            desc="Practical Ayurveda and Yoga guidance for health and longevity."
                            link="/lifestyle"
                        />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-orange-50">
                <div className="container flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1590050752117-23a9d7fc203e?auto=format&fit=crop&q=80&w=800"
                            alt="Meditation"
                            className="rounded-3xl shadow-2xl"
                        />
                    </div>
                    <div className="flex-1">
                        <Heart className="text-primary-saffron mb-6" size={48} />
                        <h2 className="text-4xl font-bold text-deep-maroon mb-6">Our Mission: Preservation through Simplification</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Hinduism is more than rituals; it's a science of living. Grihastu bridges the gap between ancient Sanskrit texts and your morning routine, making tradition accessible, logic-based, and beautiful.
                        </p>
                        <Link to="/festivals" className="btn-primary">Learn more about Festivals</Link>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

const FeatureCard = ({ icon, title, desc, link }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="glass-card p-10 flex flex-col items-center text-center group"
    >
        <div className="mb-6 p-4 bg-orange-50 rounded-2xl group-hover:bg-primary-saffron group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-deep-maroon mb-4">{title}</h3>
        <p className="text-gray-600 mb-8">{desc}</p>
        <Link to={link} className="mt-auto text-primary-saffron font-bold flex items-center gap-2 hover:underline">
            Learn More <ArrowRight size={16} />
        </Link>
    </motion.div>
);

export default Home;
