import React from 'react';

import { Icons } from '../../../../core/constants/Icon';

interface ContactInfoCardProps {
    email: string;
    contactNumber: string;
    assignedBy: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
    email,
    contactNumber,
    assignedBy
}) => {
    return (
        <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-200 max-w-sm">
            <h3 className="h3 mb-4 flex items-center gap-2">
                {Icons.idCard}  Contact Information
            </h3>
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-800">
                {Icons.idCard} {email}
            </div>
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-800">
                {Icons.phone} {contactNumber}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-800">
                {Icons.idCard} Assigned by: {assignedBy}
            </div>
        </div>
    );
};

export default ContactInfoCard;
