import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import axios from '../../../lib/axios';
import StatsSection from './Components/stats';
import SidebarAdmin from '@/components/Common/SidebarAdmin';
import SidebarReceptionist from '@/components/Common/SidebarReceptionist';
import { headerConfig } from '../../../lib/headerConfig';
import BookingSection from './Components/Booking';



function ContainerDashboard() {
    const [user, setUser] = useState('');
    const [userRole] = useState('')
    const [dataTypeRoom, setDataTypeRoom] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataBooking, setDataBooking] = useState([]);
    const [selectVal, setSelectVal] = useState('');

    useEffect(() => {
        if (localStorage.getItem('admin')) {
            setUser(JSON.parse(localStorage.getItem('admin') || '{}'));
        }

        if (localStorage.getItem('resepsionis')) {
            setUser(JSON.parse(localStorage.getItem('resepsionis') || '{}'));
        }
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
                .get('/tipe_kamar', headerConfig())
                .then((res) => setDataTypeRoom(res.data.data))
                .catch((err) => (err));
        };

        const getRoom = async () => {
            await axios
                .get('/kamar', headerConfig())
                .then((res) => setDataRoom(res.data.data))
                .catch((err) => (err));
        };
        const getBooking = async () => {
            await axios
                .get(`/pemesanan?status=${selectVal}`, headerConfig())
                .then((res) => setDataBooking(res.data.data))
                .catch((err) => (err));
        };

        Promise.all([getUser(), getTypeRoom(), getRoom(), getBooking()]);

        return () => {
            setUser('');
            setDataTypeRoom([]);
            setDataRoom([]);
            setDataUser([]);
            setDataBooking([]);
        };
    }, [selectVal]);

    return (
        <>
            <Head>
                <title>Wikusama Dashboard </title>
            </Head>
            {user?.role === 'admin' && <SidebarAdmin />}

            {user?.role === 'resepsionis' && <SidebarReceptionist />}

            <main className="bg-white md:ml-64 min-h-screen">
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full p-10">
                            <h2 className="text-2xl font-bold text-primary capitalize">
                                Dashboard {userRole}
                            </h2>
                            <StatsSection
                                dataUser={dataUser}
                                dataTypeRoom={dataTypeRoom}
                                dataRoom={dataRoom}
                                dataBooking={dataBooking}
                            />
                        </div>
                        <div className="w-full p-10">
                            <div className="pb-6">
                                <div className="flex flex-wrap items-center justify-between pb-6">
                                    <h2 className="text-gray-500 text-2xl font-semibold mb-3 lg:mb-0">
                                        Daftar Pemesanan
                                    </h2>

                                    {user?.role === 'admin' || user?.role === 'resepsionis' ? (
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center justify-center">
                                                <p className="block text-sm font-medium text-gray-500">
                                                    Sortir berdasarkan:{' '}
                                                </p>

                                                <div className="ml-3">
                                                    <select
                                                        name="status"
                                                        onChange={(e) => setSelectVal(e.target.value)}
                                                        id="status"
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                    >
                                                        <option value="">Semua</option>
                                                        <option value="baru">Baru</option>
                                                        <option value="check_in">Check-in</option>
                                                        <option value="check_out">Check-out</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className=""></div>
                                    )}
                                </div>

                                <BookingSection user={user} dataBooking={dataBooking} />
                            </div>

                        </div>
                    </div>
                </div>
                {/* <Link /> */}
            </main >
        </>
    );
}
export default ContainerDashboard
