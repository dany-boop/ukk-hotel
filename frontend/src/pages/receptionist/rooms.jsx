import React from 'react';
import { useRouter } from 'next/router';

import { blockAccess } from '@/lib/blockAccess';
import ContainerRooms from '@/components/containers/Rooms/Rooms';

const Rooms = () => {
  const router = useRouter();
  blockAccess('resepsionis', router);

  return <ContainerRooms />;
};

export default Rooms;
