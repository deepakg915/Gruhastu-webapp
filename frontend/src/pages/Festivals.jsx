import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Festivals() {
    const [festivals, setFestivals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/festivals')
            .then(res => res.json())
            .then(data => {
                setFestivals(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container py-20 text-center">Loading festivals...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="container py-20"
        >
            <h2 className="text-4xl font-bold text-deep-maroon mb-12 text-center">Festivals & Traditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {festivals.map(festival => (
                    <div key={festival.name} className="glass-card p-8">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-primary-saffron">{festival.name}</h3>
                            <span className="bg-maroon-100 text-deep-maroon px-3 py-1 rounded-full text-sm font-semibold border border-deep-maroon">
                                {festival.date}
                            </span>
                        </div>
                        <p className="text-gray-700">{festival.description}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Festivals;
