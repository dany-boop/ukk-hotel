import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import axios from '@/lib/axios'
import { headerConfig } from '@/lib/headerConfig'
import { formatLocalTime } from '@/lib/formatlocaltime'
import Sidebar from '@/components/common/SidebarAdmin'

function ContainerDetailBooking() {
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (localStorage.getItem('admin')) {
            setUser(JSON.parse(localStorage.getItem('admin') || '{}'));
        }

        if (localStorage.getItem('resepsionis')) {
            setUser(JSON.parse(localStorage.getItem('resepsionis') || '{}'));
        }

        if (id) {
            const getData = async () => {
                await axios
                    .get(`/pemesanan/${id}`, headerConfig())
                    .then((res) => {
                        res ? setData(res.data.pemesanan) : alert('Data tidak ditemukan!');
                    })
                    .catch((err) => {
                        alert('Data tidak ditemukan!');
                        console.log(err);
                    });
            };

            const getDataById = async () => {
                await axios
                    .get(`/detail_pemesanan/${id}`, headerConfig())
                    .then((res) => {
                        if (res) {
                            setDataRoom(res.data.data);
                        } else {
                            alert('Data tidak ditemukan!');
                        }
                    })
                    .catch((err) => {
                        alert('Data tidak ditemukan!');
                        console.log(err);
                    });
            };

            Promise.all([getData(), getDataById()]);
        }
    }, [id]);

    console.log(dataRoom)

    return (
        <>
            <Head>
                <title>Detail Pemesanan - Wikusama Hotel</title>
            </Head>

            <Sidebar />
            <main className="bg-white md:ml-64 min-h-screen">
                <section className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full px-10 pt-10">
                            <h2 className="text-2xl font-bold text-primary capitalize">
                                Detail Pemesanan
                            </h2>
                        </div>

                        <div className="w-full p-10">
                            <div className="w-full">
                                <div className="border-gray-300 bg-white border-solid border-2 rounded-lg px-5">
                                    <div className="mt-3">
                                        <h1 className="text-xl font-bold text-primary border-b-2 border-solid border-gray-300 pb-3">
                                            Rincian Pesanan
                                        </h1>

                                        <div className="w-full lg:flex justify-between gap-5 py-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Nomor Pemesanan
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                    type="text"
                                                    value={data?.nomor_pemesan || 'Tidak Diketahui'}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between gap-5 pb-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Nama Tipe Kamar
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                    type="text"
                                                    value={
                                                        data?.tipe_kamar?.nama_tipe_kamar ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between gap-5 pb-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Nama Pemesan
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                    type="text"
                                                    value={data?.nama_pemesan || 'Tidak Diketahui'}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Email Pemesan
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                    type="email"
                                                    value={data?.email_pemesan || 'Tidak Diketahui'}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between gap-5 pb-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                                                    Tgl Pemesanan
                                                </h2>

                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full rounded-lg "
                                                    value={
                                                        formatLocalTime(data?.tgl_pemesanan) ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                                                    Tgl Check In
                                                </h2>

                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full rounded-lg "
                                                    value={
                                                        formatLocalTime(data?.tgl_check_in) ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                                                    Tgl Check Out
                                                </h2>

                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full rounded-lg "
                                                    value={
                                                        formatLocalTime(data?.tgl_check_out) ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 w-full flex justify-between items-center">
                                            <h1 className="text-xl font-medium">Cetak Invoice</h1>

                                            {user.role === 'admin' || user.role === 'resepsionis' ? (
                                                <Link
                                                    href={
                                                        user.role === 'admin'
                                                            ? `/admin/booking/detail/${id}/Invoice`
                                                            : `/receptionist/booking/detail/${id}/invoice`
                                                    }
                                                    legacyBehavior
                                                >
                                                    <a className="bg-yellow-500 text-white font-medium px-3 py-2 rounded-lg">
                                                        Cetak Invoice
                                                    </a>
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/customer/booking/detail/${id}/invoice`}
                                                    legacyBehavior
                                                >
                                                    <a className="bg-yellow-500 text-white font-medium px-3 py-2 rounded-lg">
                                                        Cetak Invoice
                                                    </a>
                                                </Link>
                                            )}
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left text-gray-500 my-5">
                                                <thead className="text-xs text-white uppercase bg-yellow-500">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            No Kamar
                                                        </th>

                                                        <th scope="col" className="px-6 py-3">
                                                            Nama Tipe Kamar
                                                        </th>

                                                        <th scope="col" className="px-6 py-3">
                                                            Tgl Check In
                                                        </th>

                                                        <th scope="col" className="px-6 py-3">
                                                            Tgl Check Out
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {!dataRoom?.length ? (
                                                        <tr>
                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        dataRoom.map((val, index) => (
                                                            <tr key={index} className="bg-gray-500">
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {val.kamar?.nomor_kamar}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {data?.tipe_kamar?.nama_tipe_kamar}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {formatLocalTime(data?.tgl_check_in)}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {formatLocalTime(data?.tgl_check_out)}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ContainerDetailBooking