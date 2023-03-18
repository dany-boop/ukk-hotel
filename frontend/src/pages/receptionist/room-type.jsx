import React from 'react';
import { useRouter } from 'next/router';

import { blockAccess } from '@/lib/blockAccess';
import ContainerRoomType from '@/components/Containers/RoomType/RoomType';

const RoomType = () => {
  const router = useRouter();
  blockAccess('resepsionis', router);

  return <ContainerRoomType />;
};

export default RoomType;
