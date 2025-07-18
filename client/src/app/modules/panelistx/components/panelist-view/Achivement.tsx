import React from 'react';



interface AchievementProps {
    items: {
        awards: string
    };
}

const Achievement: React.FC<AchievementProps> = ({ items }) => {
    return (
        <div className="bg-white shadow-sm p-5 rounded-lg">
            <h3 className="h5 mb-4">Awards & Recognition</h3>

            <div className="font-bold text-gray-800">{items.awards}</div>
        </div>
    );
};

export default Achievement;