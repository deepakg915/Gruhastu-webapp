import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Stories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stories')
            .then(res => res.json())
            .then(data => {
                setStories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container py-20 text-center">Loading stories...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container py-20"
        >
            <h2 className="text-4xl font-bold text-deep-maroon mb-12 text-center">Epic Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {stories.map(story => (
                    <div key={story.id} className="glass-card overflow-hidden">
                        <img src={story.image} alt={story.title} className="w-full h-64 object-cover" />
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-primary-saffron mb-4">{story.title}</h3>
                            <p className="text-gray-700 mb-6">{story.content}</p>
                            <div className="flex flex-wrap gap-2">
                                {story.lessons.map(lesson => (
                                    <span key={lesson} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        {lesson}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Stories;
