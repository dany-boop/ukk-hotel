import React from 'react';
import Link from 'next/link';

import { formatCurrency } from '@/lib/formatCurrency';
import SideMainContent from './SideMainContent';

function MainContentSection({ data }) {
    return (
        <>
            <section className="py-10 lg:py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="container">
                        <div className="grid grid-cols-10 gap-5 px-4">
                            <div className="col-span-10 lg:col-span-7">
                                <div className="flex flex-col">
                                    <img
                                        src={data?.foto}
                                        alt="Type Room Image"
                                        loading="lazy"
                                        className="lg:h-[500px] rounded-lg object-cover object-center"
                                    />

                                    <div className="py-5">
                                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                            Wikusama Hotel {data?.nama_tipe_kamar}
                                        </h2>

                                        <p className="text-gray-500 text-sm">
                                            Oleh{' '}
                                            <Link href="/about" legacyBehavior>
                                                <a className="text-primary hover:underline">
                                                    Wikusama Hotel
                                                </a>
                                            </Link>
                                        </p>

                                        <div className="flex items-end gap-2 my-4">
                                            <p className="font-bold text-black text-3xl">
                                                {formatCurrency(data?.harga)}
                                            </p>

                                            <p className="text-gray-400 text-sm">/ malam</p>
                                        </div>

                                        <p
                                            dangerouslySetInnerHTML={{ __html: data?.deskripsi }}
                                            className="font-medium text-justify text-base text-gray-500 whitespace-no-wrap"
                                        />
                                    </div>
                                </div>
                            </div>

                            <SideMainContent data={data} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainContentSection;
