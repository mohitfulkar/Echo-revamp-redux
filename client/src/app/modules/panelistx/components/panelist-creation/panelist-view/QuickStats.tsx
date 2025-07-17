import React from 'react';
import { Icons } from '../../../../../core/constants/Icon';

interface QuickStatsProps {
    experience?: number;
    expertise?: number;
    certification?: number;
    rsb?: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
    experience = 4,
    expertise = 5,
    certification = 4,
    rsb = 3
}) => {
    return (
        <>
            <div className="shadow-sm        p-4 bg-white rounded-lg shadow-sm">
                <h3 className='h3' > {Icons.star}  Quick Stats</h3>

                {/* Years Experience */}
                <div className='grid grid-cols-2 gap-4 '>
                    <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-2xl font-bold text-gray-800">{experience}</span>
                        <span className="text-sm text-gray-500">Years of Experience</span>
                    </div>

                    {/* Expertise Areas */}
                    <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-2xl font-bold text-gray-800">{expertise}</span>
                        <span className="text-sm text-gray-500">Expertise Areas</span>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-2xl font-bold text-gray-800">{certification}</span>
                        <span className="text-sm text-gray-500">Certifications</span>
                    </div>

                    {/* Photos */}
                    <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-2xl font-bold text-gray-800">{rsb}</span>
                        <span className="text-sm text-gray-500">Responsibility</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickStats;