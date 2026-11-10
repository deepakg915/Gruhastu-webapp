import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Chatbot() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Namaste! I am your Spiritual Guide. How can I assist you on your path of Dharma today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] })
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();
            setMessages(prev => [...prev, data]);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Forgive me, I am unable to connect to the divine source right now. Please try again later.' }]);
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="container py-20"
        >
            <div className="max-w-3xl mx-auto glass-card overflow-hidden flex flex-col h-[600px]">
                <div className="p-6 saffron-gradient text-white">
                    <h2 className="text-2xl font-bold">AI Spiritual Guru</h2>
                    <p className="text-sm opacity-90">Instant guidance on Hindu traditions and philosophy</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user'
                                ? 'bg-primary-saffron text-white rounded-tr-none'
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                }`}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-tl-none italic">
                                The Guru is contemplating...
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t flex gap-2">
                    <input
                        type="text"
                        className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary-saffron"
                        placeholder="Ask anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} className="btn-primary">Send</button>
                </div>
            </div>
        </motion.div>
    );
}

export default Chatbot;
