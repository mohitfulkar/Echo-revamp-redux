import React, { useEffect, useState } from 'react';
import Header from '../components/panelist-view/Header';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import { getPanelistById } from '../../voter/features/userSlices';
import { useParams, useSearchParams } from 'react-router-dom';
import ContactInfoCard from '../components/panelist-view/ContactInfoCard';
import SocialMediaLinks from '../components/panelist-view/SocialMediaLinks';
import QuickStats from '../components/panelist-view/QuickStats';
import SharedTabs from '../../../core/components/TabComponent';
import type { CrumbItem, TabConfig } from '../../../core/models/sharedComponent';
import Overview from '../components/panelist-view/Overview';
import Documents from '../components/panelist-view/Documents';
import Achivement from '../components/panelist-view/Achivement';
import SharedBreadcrumb from '../../../core/components/SharedBreadCrumb';

const ViewPanelist: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { panelistId } = useParams();
    const items = useSelector((state: RootState) => state.users.itemsByKey['users']);
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab') || "category";
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setSearchParams({ tab: key });
    };

    useEffect(() => {
        dispatch(getPanelistById({ id: panelistId }));
    }, [dispatch, panelistId]);

    const TabItems: TabConfig[] = [
        { label: 'Overview', key: 'category', children: <Overview items={items} /> },
        { label: 'Documents', key: 'documents', children: <Documents items={items} /> },
        { label: 'Achivement', key: 'achivement', children: <Achivement items={items} /> },
    ];
    const breadcrumbItems: CrumbItem[] = [
        { label: "Panelist", href: "/super-panelist/panelists" },
        { label: `${items?.name}` },
    ];

    return (
        <>
            <SharedBreadcrumb items={breadcrumbItems} showHome={false} />
            <Header
                name={items?.name}
                occupation={items?.occupation}
                photo={items?.photo}
                category={items?.category?.name}
                experience={items?.experience}
            />
            <div className="flex mt-4 space-x-4">
                <div className="w-1/3 space-y-3">
                    <ContactInfoCard
                        email={items?.email ?? 'NA'}
                        contactNumber={items?.contactNumber ?? 'NA'}
                        assignedBy={items?.assignedBy ?? 'NA'}
                    />
                    <SocialMediaLinks
                        linkedIn={items?.linkedIn}
                        twitter={items?.twitter}
                        github={items?.github}
                        website={items?.website}
                        other={items?.other}
                    />
                    <QuickStats
                        rsb={items?.rsb?.length}
                        experience={items?.experience}
                        expertise={items?.expertise?.length}
                        certification={items?.certification?.length} />
                </div>
                <div className="w-2/3 h-screen">
                    <SharedTabs tabs={TabItems}
                        defaultActiveKey={activeTab}
                        onChange={handleTabChange} />
                </div>
            </div>
        </>
    );
};

export default ViewPanelist;