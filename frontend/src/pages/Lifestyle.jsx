import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Lifestyle() {
    const [lifestyle, setLifestyle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/lifestyle')
            .then(res => res.json())
            .then(data => {
                setLifestyle(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container py-20 text-center">Loading lifestyle guidance...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container py-20"
        >
            <h2 className="text-4xl font-bold text-deep-maroon mb-12 text-center">Hindu Lifestyle Guidance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-8">
                    <h3 className="text-2xl font-bold text-primary-saffron mb-6 border-b pb-2">Ayurveda</h3>
                    <ul className="space-y-4">
                        {lifestyle.ayurveda.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary-saffron"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="glass-card p-8">
                    <h3 className="text-2xl font-bold text-primary-saffron mb-6 border-b pb-2">Yoga</h3>
                    <ul className="space-y-4">
                        {lifestyle.yoga.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary-saffron"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="glass-card p-8">
                    <h3 className="text-2xl font-bold text-primary-saffron mb-6 border-b pb-2">Meditation</h3>
                    <ul className="space-y-4">
                        {lifestyle.meditation.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary-saffron"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

export default Lifestyle;
