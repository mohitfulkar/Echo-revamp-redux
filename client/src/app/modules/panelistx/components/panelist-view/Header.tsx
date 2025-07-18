import React from 'react';
import { Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface PanelistHeaderProps {
    name: string;
    occupation: string;
    photo: string;
    category: string;
    experience: number;
}

const Header: React.FC<PanelistHeaderProps> = ({
    name,
    occupation,
    photo,
    category,
    experience,
}) => {
    return (
        <div className="bg-[#1c1c1f] rounded-2xl p-6 flex items-center gap-6 text-white">
            <div className="relative">
                <Badge
                    count={<UserOutlined style={{ color: 'white' }} />}
                    offset={[-10, 70]}
                    style={{ backgroundColor: '#2ecc71' }}
                >
                    <img
                        src={photo}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white"
                    />
                </Badge>
            </div>

            <div>
                <h2 className="text-gray-100">{name}</h2>
                <p className="text-sm mt-1">{occupation}</p>
                <div className="flex gap-2 mt-3">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {category}
                    </span>
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {experience} years experience
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
