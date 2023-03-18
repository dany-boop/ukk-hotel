import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BiPrinter } from 'react-icons/bi';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import axios from '@/lib/axios';
import { headerConfig } from '@/lib/headerConfig';
import { formatCurrency } from '@/lib/formatCurrency';
import { formatLocalTime } from '@/lib/formatLocalTime';
import { diffDays } from '@/lib/diffDays';
import { totalPrice } from '@/lib/ttlPrice';
import Sidebar from '@/components/Common/SidebarAdmin';
// import SidebarReceptionist from '@/components/Common/SidebarReceptionist';
// import SidebarCustomer from '@/components/Common/SidebarCustomer';

const ContainerInvoice = () => {
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [dataRoom, setDataRoom] = useState();

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
                        res ? setData(res.data.data) : alert('Data tidak ditemukan!');
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

    const componentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentsRef?.current,
    });

    const subTotal = (totalRoom, price) => {
        return formatCurrency(totalRoom * price);
    };

    return (
        <>
            <Head>
                <title>Cetak Invoice - Wikusama Hotel</title>
            </Head>

            {user?.role === 'admin' && <Sidebar />}

            {/* {user?.role === 'resepsionis' && <SidebarReceptionist />} */}

            {/* {user?.role === 'pelanggan' && <SidebarCustomer />} */}

            <main className="md:ml-64 min-h-screen">
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative flex items-center justify-center">
                                <button
                                    onClick={handlePrint}
                                    className="fixed bg-primary text-white right-4 bottom-4 p-3 rounded-full"
                                >
                                    <BiPrinter className="text-3xl " />
                                </button>
                            </div>

                            <div ref={componentsRef} className="print:shadow-none shadow-lg">
                                <section>
                                    <div className="print:py-0 py-16">
                                        <div className="rounded-b-md">
                                            <div className="p-9">
                                                <div className="space-y-6 text-slate-700">
                                                    <Link href="/" legacyBehavior>
                                                        <val
                                                            className="inline-flex items-center gap-2 font-primary font-bold text-xl lg:text-2xl py-6"
                                                            aria-label="logo"
                                                        >
                                                            <img
                                                                src="/apple-touch-icon.png"
                                                                alt="Brand Logo"
                                                                className="w-8 h-8 object-cover object-center"
                                                            />
                                                            Wikusama Hotel
                                                        </val>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="p-9">
                                                <div className="flex w-full">
                                                    <div className="grid grid-cols-4 gap-12">
                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="text-sm font-normal text-slate-700">
                                                                Detail Invoice
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                Malang, East Java
                                                            </p>
                                                        </div>

                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="text-sm font-normal text-slate-700">
                                                                Diberikan Kepada
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                {`${data?.pemesanan?.nama_pemesan}, ${data?.pemesanan?.email_pemesan}`}
                                                            </p>
                                                        </div>

                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="text-sm font-normal text-slate-700">
                                                                Nomor Pemesanan
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                {data?.nomor_pemesanan || 'Tidak Diketahui'}
                                                            </p>
                                                        </div>

                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="mt-2 text-sm font-normal text-slate-700">
                                                                Tanggal Pemesanan
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                {formatLocalTime(data?.tgl_pemesanan) ||
                                                                    'Tidak Diketahui'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-9 overflow-x-auto">
                                                <div className="flex flex-col mx-0 mt-8">
                                                    <table className="w-full divide-y divide-slate-500">
                                                        <thead>
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Nomor Kamar
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Tipe Kamar
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Tgl Check-in
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Tgl Check-out
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Harga
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

                                                                    <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                        <div className="flex items-center select-none">
                                                                            <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                                this text will not displayed
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                dataRoom?.map((val, index) => (
                                                                    <tr
                                                                        key={index}
                                                                        className="border-b border-slate-200"
                                                                    >
                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {val.kamar?.nomor_kamar}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {data?.nama_tipe_kamar}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {formatLocalTime(data?.tgl_check_in)}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {formatLocalTime(data?.tgl_check_out)}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {formatCurrency(
                                                                                        data?.tipe_kamar?.harga
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>

                                                        <tfoot>
                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                                >
                                                                    Subtotal
                                                                </th>

                                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                    {subTotal(
                                                                        data?.jumlah_kamar,
                                                                        data?.tipe_kamar?.harga
                                                                    ) || 'Tidak Diketahui'}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                                >
                                                                    Total Kamar
                                                                </th>

                                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                    {data?.jumlah_kamar || 'Tidak Diketahui'}{' '}
                                                                    Kamar
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                                >
                                                                    Lama Menginap
                                                                </th>

                                                                <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                    {diffDays(
                                                                        data?.tgl_check_in,
                                                                        data?.tgl_check_out
                                                                    ) || 'Tidak Diketahui'}{' '}
                                                                    Hari
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                                                                >
                                                                    Total
                                                                </th>

                                                                <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                                                    {totalPrice(
                                                                        data?.tgl_check_in,
                                                                        data?.tgl_check_out,
                                                                        data?.jumlah_kamar,
                                                                        data?.tipe_kamar?.harga
                                                                    ) || 'Tidak Diketahui'}
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="px-9">
                                                <div className="border-t py-9 border-slate-200">
                                                    <div className="text-sm text-justify font-light text-slate-700 ">
                                                        <p>
                                                            Jangka waktu pembayaran adalah 14 hari. Perlu
                                                            diketahui bahwa menurut Undang-Undang Pembayaran
                                                            Utang Terlambat 0000, pekerja lepas berhak untuk
                                                            mengklaim biaya keterlambatan 00.00 setelah tidak
                                                            membayar utang setelah waktu ini, di mana faktur
                                                            baru akan diajukan dengan tambahan biaya ini. Jika
                                                            pembayaran tagihan yang telah direvisi tidak
                                                            diterima dalam 14 hari berikutnya, bunga tambahan
                                                            akan dibebankan ke rekening yang telah jatuh tempo
                                                            dan tingkat wajib sebesar 8% ditambah dasar Bank
                                                            of England sebesar 0,5%, dengan total 8,5%. Para
                                                            pihak tidak dapat membuat kontrak di luar
                                                            ketentuan Undang-undang.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ContainerInvoice;
