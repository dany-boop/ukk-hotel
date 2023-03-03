import React from 'react';
import Link from 'next/link';

import { formatCurrency } from '@/lib/formatCurrency';

const RoomCardSection = ({ dataRoom }) => {
    console.log(dataRoom);

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto">
                <div className="container">
                    <div className="w-full px-4">
                        <div className="grid grid-cols-12 gap-5">
                            {dataRoom.map((val, index) => (
                                <div className="col-span-12 lg:col-span-3" key={index}>
                                    <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg hover:-translate-y-5 transition-all ease-in-out duration-300">
                                        <Link
                                            href={`/search-room/details/${val.id}`}
                                            legacyBehavior
                                        >
                                            <a>
                                                <img
                                                    className="w-full h-[200px] object-cover object-center"
                                                    src={val.foto || '/assets/img/template-img-room.png'}
                                                    loading="lazy"
                                                    alt="Sunset in the mountains"
                                                />
                                            </a>
                                        </Link>

                                        <div className="px-6 py-4">
                                            <Link
                                                href={`/search-room/details/${val.id}`}
                                                legacyBehavior
                                            >
                                                <a className="font-bold text-xl text-primary">
                                                    {val.nama_tipe_kamar}
                                                </a>
                                            </Link>

                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: val.deskripsi.substring(0, 25) + '...',
                                                }}
                                                className="font-normal text-base text-gray-500 whitespace-no-wrap mt-2"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between px-6 pb-4">
                                            <p className="font-semibold text-lg text-gray-500">
                                                {formatCurrency(val.harga)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoomCardSection;
