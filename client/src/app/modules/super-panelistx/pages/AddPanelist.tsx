import React from 'react'
import SharedBreadcrumb from '../../../core/components/SharedBreadCrumb'
import PanelistForm from '../../panelistx/components/panelist-creation/PanelistForm'
import type { CrumbItem } from '../../../core/models/sharedComponent';
import { useParams } from 'react-router-dom';

const AddPanelist: React.FC = () => {
    const { action } = useParams<{ action?: string }>();

    const breadcrumbItems: CrumbItem[] = [
        { label: "Panelist" },
        { label: action === "edit" ? "Edit Panelist" : "Add Panelist" },
    ];

    return (
        <div>
            <h4 className="h4">{action === "edit" ? "Edit Panelist" : "Create Panelist"}</h4>
            <SharedBreadcrumb items={breadcrumbItems} showHome={false} />
            <div className="border border-gray-300 p-4 rounded-md mt-4 bg-white mt-8">
                <PanelistForm />
            </div>
        </div>
    )
}

export default AddPanelist