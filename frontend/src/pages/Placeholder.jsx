import React from 'react';

function Placeholder({ title }) {
    return (
        <div className="container py-20 text-center">
            <h2 className="text-4xl font-bold text-deep-maroon mb-6">{title}</h2>
            <p className="text-xl text-gray-600">This feature is coming soon. Stay tuned!</p>
        </div>
    );
}

export default Placeholder;
