import React from 'react';
import { useRouter } from 'next/router';

import { blockAccess } from '@/lib/blockAccess';
import ContainerDashboard from '@/components/Containers/Dashboard/Dashboard';

const DashboardAdmin = () => {
    const router = useRouter();
    blockAccess('resepsionis', router);

    return <ContainerDashboard />;
};

export default DashboardAdmin;