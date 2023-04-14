import React from 'react';
import { useRouter } from 'next/router';

import { blockAccess } from '@/lib/blockAccess';
import Containerinvoice from '@/components/containers/Booking/Invoice';

const Invoice = () => {
    const router = useRouter();
    blockAccess('resepsionis', router);

    return <Containerinvoice />
};

export default Invoice;
