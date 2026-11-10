import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Stotras() {
    const [stotras, setStotras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stotras')
            .then(res => res.json())
            .then(data => {
                setStotras(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container py-20 text-center">Loading stotras...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="container py-20"
        >
            <h2 className="text-4xl font-bold text-deep-maroon mb-12 text-center">Stotras & Shlokas Library</h2>
            <div className="grid grid-cols-1 gap-8">
                {stotras.map(stotra => (
                    <div key={stotra.id} className="glass-card p-10 border-l-8 border-primary-saffron">
                        <h3 className="text-3xl font-bold text-deep-maroon mb-4">{stotra.name}</h3>
                        <div className="bg-orange-50 p-6 rounded-lg mb-6 italic text-lg text-gray-800 whitespace-pre-line">
                            {stotra.content}
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold text-primary-saffron uppercase text-sm tracking-widest mb-2">Meaning</h4>
                            <p className="text-gray-700">{stotra.meaning}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-primary-saffron uppercase text-sm tracking-widest mb-2">Benefit</h4>
                            <p className="text-gray-700">{stotra.benefit}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Stotras;
