import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import axios from '@/lib/axios';
import { headerConfig } from '@/lib/headerConfig';
import { classNames } from '@/lib/classNames';
import Sidebar from '@/components/Common/Sidebar';
import Link from 'next/link';
import PreviewProfile from './Components/Preview';


function ContainerProfile() {
    const [dataLogin, setDataLogin] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        if (localStorage.getItem('admin')) {
            setDataLogin(JSON.parse(localStorage.getItem('admin') || '{}'));
        }

        if (localStorage.getItem('resepsionis')) {
            setDataLogin(JSON.parse(localStorage.getItem('resepsionis') || '{}'));
        }

        const getData = async () => {
            await axios
                .get('/user', headerConfig())
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        Promise.all([getData()]);

        return () => {
            setData([]);
        };
    }, []);
    return (
        <>
            <Head>
                <title>Profil Saya - Wikusama Hotel</title>
            </Head>
            <Sidebar />

            {/* {dataLogin?.role === 'admin' && <SidebarAdmin />} */}

            {/* {dataLogin?.role === 'resepsionis' && <SidebarReceptionist />} */}

            <main className="bg-white md:ml-64 min-h-screen">
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full p-10">
                            <h2 className="text-2xl font-bold text-primary mb-5">
                                Pengaturan Profil
                            </h2>
                            <PreviewProfile />
                        </div>
                    </div>
                </div>
            </main >
        </>
    )
}

export default ContainerProfile