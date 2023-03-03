import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import axios from '../../../lib/axios';
import StatsSection from './stats';
import Sidebar from '../../Common/Sidebar';
import { headerConfig } from '../../../lib/headerConfig';


function ContainerDashboard() {
    const [user, setUser] = useState('');
    const [userRole, setUserRole] = useState('')
    const [dataTypeRoom, setDataTypeRoom] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [dataUser, setDataUser] = useState([]);

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
                .get('/room', headerConfig())
                .then((res) => setDataRoom(res.data.data))
                .catch((err) => (err));
        };
        Promise.all([getUser(), getTypeRoom(), getRoom(),]);

        return () => {
            setUser('');
            setDataTypeRoom([]);
            setDataRoom([]);
            setDataUser([]);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Wikusama Dashboard</title>
            </Head>
            <Sidebar />
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
                            />
                        </div>
                    </div>
                </div>
                {/* <Link /> */}
            </main >
        </>
    );
}
export default ContainerDashboard
