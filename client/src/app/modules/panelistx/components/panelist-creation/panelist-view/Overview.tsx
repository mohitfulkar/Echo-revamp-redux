import React from 'react';
import { Icons } from '../../../../../core/constants/Icon';

interface OverviewProps {
    items: {
        designation: any;
        contribution: string;
        publications: string;
        expertise?: any
    };
}

const Overview: React.FC<OverviewProps> = ({ items }) => {
    const fields = [
        {
            label: "Designation",
            key: "designation",
            icon: Icons.star,
        },
        {
            label: "Contribution",
            key: "contribution",
            icon: Icons.bulb,
        },
        {
            label: "Publications",
            key: "publications",
            icon: Icons.book,
        },
    ];

    items = {
        ...items,
        designation: items?.designation?.name
    }

    const expertiseAreas = items?.expertise?.map((item: any) => item?.name) || []

    return (
        <> <div className="bg-white shadow-sm p-5 rounded-lg">
            <h3 className="h3 flex items-center gap-2 mb-4">
                {Icons.barChart} Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                    <div key={field.key} className="border border-gray-200 rounded-md p-4">
                        <div className="flex items-center gap-2 mb-2 text-gray-600 font-medium">
                            {field.icon}
                            {field.label}
                        </div>
                        <div className="text-black font-normal">
                            {items[field.key as keyof typeof items] || '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
            <div className='mt-4 bg-white shadow-sm p-5 rounded-lg'>
                <h3 className="h3 flex items-center gap-2  mb-4">
                    {Icons.book} Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                    {expertiseAreas.map((area: string) => (
                        <span
                            key={area}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                            {area}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Overview;
