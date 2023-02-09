import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaCartPlus } from 'react-icons/fa';
import axios from '../../../lib/axios';

import Sidebar from '../../Common/Sidebar';
import { headerConfig } from '../../../lib/headerConfig';


function ContainerDashboard() {
    const [dataTypeRoom, setDataTypeRoom] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [dataBooking, setDataBooking] = useState([]);
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            await axios
                .get('/user', headerConfig())
                .then((res) => {
                    setDataUser(res.data.data);
                })
                .catch((err) => console.log(err));
        };

        const getTypeRoom = async () => {
            await axios
                .get('/type-room', headerConfig())
                .catch((err) => console.log(err));
        };

        const getRoom = async () => {
            await axios
                .get('/room', headerConfig())
                .catch((err) => console.log(err));
        };

        const getBooking = async () => {
            await axios
                .get('/booking', headerConfig())
                .catch((err) => console.log(err));
        };
        Promise.all([getUser(), getTypeRoom(), getRoom(), getBooking()]);
    }, []);


    return (
        <>
            <Head>
                <title>Dasbor - Wikusama Hotel</title>
            </Head>
            <Sidebar />
            <main className="bg-white md:ml-64 min-h-screen">
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full p-10">
                            <h2 className="text-2xl font-bold text-primary">Dashbor Admin</h2>
                        </div>

                        <div className="w-full p-10">
                            <div className="flex items-center justify-between pb-6">
                                <div>
                                    <h2 className="text-gray-500 text-2xl font-semibold">
                                        Daftar Pemesanan
                                    </h2>
                                </div>
                                <div className="flex flex-wrap items-center justify-between">
                                    <div className="lg:ml-40 ml-10 space-x-8">
                                        <Link
                                            href="/admin/booking/add"
                                            className="flex items-center justify-center bg-primary hover:bg-primarydark px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                                        >
                                            {/* <FaCartPlus className="mr-2" /> Tambah Pemesanan */}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ContainerDashboard;
