import React from 'react';
import type { CrumbItem } from '../../../core/models/sharedComponent';
import SharedBreadcrumb from '../../../core/components/SharedBreadCrumb';
import SuperPanelistForm from '../components/SuperPanelistForm';
const SuperPanelistCreation: React.FC = () => {
    const breadcrumbItems: CrumbItem[] = [
        { label: "Users", href: "/admin/manage-users" },
        { label: "Add Super Panelist" },
    ];
    return (
        <div>
            <h4 className="h4">Create Super Panelist</h4>
            <SharedBreadcrumb items={breadcrumbItems} />

            <div className="border border-gray-300 p-4 rounded-md mt-4 bg-white mt-8">
                <SuperPanelistForm />
            </div>
        </div>
    );
};

export default SuperPanelistCreation;
