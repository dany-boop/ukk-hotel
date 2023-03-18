import React from 'react';
import { useRouter } from 'next/router';

import { blockAccess } from '@/lib/blockAccess';
import ContainerUser from '@/components/Containers/User/User';

const User = () => {
    const router = useRouter();
    blockAccess('resepsionis', router);

    return <ContainerUser />;
};

export default User;
