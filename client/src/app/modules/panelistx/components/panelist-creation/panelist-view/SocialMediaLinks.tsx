import React from 'react';
import { Icons } from '../../../../../core/constants/Icon';

interface SocialMediaLinksProps {
    linkedIn?: string;
    twitter?: string;
    github?: string;
    website?: string;
    other?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
    linkedIn,
    twitter,
    github,
    website,
    other,
}) => {
    const items = [
        { label: 'LinkedIn', icon: Icons.linkedin, link: linkedIn },
        { label: 'Twitter', icon: Icons.twitter, link: twitter },
        { label: 'GitHub', icon: Icons.github, link: github },
        { label: 'Website', icon: Icons.whatsapp, link: website },
        { label: 'Other', icon: Icons.link, link: other },
    ];

    return (
        <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-200 max-w-sm">
            <h3 className="h3 mb-4 flex items-center gap-2">
                {Icons.link} Social Media
            </h3>
            <div className="flex flex-col gap-3">
                {items.map(
                    (item) =>
                        item.link && (
                            <a
                                key={item.label}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition"
                            >
                                {item.icon} <span>{item.label}</span>
                            </a>
                        )
                )}
            </div>
        </div>
    );
};

export default SocialMediaLinks;
