import React from 'react';
import { useRouter } from 'next/router';

import { blockAccess } from '@/lib/blockAccess';
import ContainerProfile from '@/components/Containers/Profile/Profile';

const Profile = () => {
    const router = useRouter();
    blockAccess('admin', router);

    return <ContainerProfile />
};

export default Profile;
