import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from '@/lib/axios';
import { bindingState } from '@/lib/bindingState';
import { diffDays } from '@/lib/diffDays';
import { totalPrice } from '@/lib/ttlPrice';
import { AiTwotoneAlert } from 'react-icons/ai';

function SideMainContent({ data }) {
    const [dataDate, setDataDate] = useState({
        tgl_check_in: '',
        tgl_check_out: '',
    });
    const [bookingData, setBookingData] = useState({
        tgl_check_in: '',
        tgl_check_out: '',
        nama_pemesan: '',
        email_pemesan: '',
        nama_tamu: '',
        jumlah_kamar: '',
        id_tipe_kamar: '',
        status_pemesanan: '',
    });

    const router = useRouter();

    useEffect(() => {
        // Get date check-in & check-out from localStorage
        const tgl_check_in = localStorage.getItem('tgl_check_in');
        const tgl_check_out = localStorage.getItem('tgl_check_out');

        if (tgl_check_in && tgl_check_out) {
            setDataDate({
                tgl_check_in,
                tgl_check_out,
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const token = localStorage.getItem('access');

        const sendData = {
            ...bookingData,
            tgl_check_in: dataDate.tgl_check_in,
            tgl_check_out: dataDate.tgl_check_out,
            nama_pemesan: bookingData.nama_pemesan,
            email_pemesan: bookingData.email_pemesan,
            nama_tamu: bookingData.nama_tamu,
            id_tipe_kamar: data.id_tipe_kamar,
            status_pemesanan: 'baru',
        };

        await axios
            .post('/pemesanan', sendData,)
            .then((res) => {
                if (res.data.success === 1) {
                    alert(
                        'Pemesanan berhasil dibuat! Silahkan lakukan pembayaran.'
                    );

                    localStorage.setItem(
                        'nama_pemesan',
                        JSON.stringify(bookingData.nama_pemesan)
                    );
                    localStorage.setItem(
                        'email_pemesan',
                        JSON.stringify(bookingData.email_pemesan)
                    );
                    localStorage.setItem(
                        'tipe_kamar',
                        JSON.stringify(data.nama_tipe_kamar)
                    );
                    localStorage.setItem(
                        'jumlah_kamar',
                        JSON.stringify(bookingData.jumlah_kamar)
                    );
                    localStorage.setItem(
                        'nama_tamu',
                        JSON.stringify(bookingData.nama_tamu)
                    );
                    localStorage.setItem(
                        'total_hari',
                        JSON.stringify(
                            diffDays(dataDate.tgl_check_in, dataDate.tgl_check_out)
                        )
                    );
                    localStorage.setItem(
                        'total_harga',
                        JSON.stringify(
                            totalPrice(
                                dataDate.tgl_check_in,
                                dataDate.tgl_check_out,
                                bookingData.jumlah_kamar,
                                data.harga
                            )
                        )
                    );

                    setTimeout(() => {
                        router.push('/payment');
                    }, 1800);
                } else {
                    AiTwotoneAlert('Gagal membuat pemesanan, silahkan coba lagi nanti!');
                }
            })
            .catch((err) => {
                alert('Gagal membuat pemesanan, silahkan coba lagi nanti!');
                console.log(err);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="col-span-10 lg:col-span-3">
            <div className="bg-gray-100 rounded-lg px-4 py-3">
                <h1 className="text-lg font-semibold border-b text-gray-500 border-gray-500 pb-2">
                    Pesan Kamar
                </h1>

                <div className="py-2">
                    <h2 className="text-sm font-medium text-gray-500 pb-2">
                        Nama Pemesan
                    </h2>
                    <input
                        type="text"
                        name="nama_pemesan"
                        id="nama_pemesan"
                        className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                        placeholder="Masukkan nama tamu"
                        required
                        min={0}
                        max={data?.nama_pemesan?.length}
                        value={bookingData.nama_pemesan}
                        onChange={(e) => bindingState(e, setBookingData, 'nama_pemesan')}
                    />
                </div>

                <div className="py-2">
                    <h2 className="text-sm font-medium text-gray-500 pb-2">
                        Email Pemesan
                    </h2>
                    <input
                        type="text"
                        name="email_pemesan"
                        id="email_pemesan"
                        className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                        placeholder="Masukkan nama tamu"
                        required
                        min={0}
                        max={data?.email_pemesan?.length}
                        value={bookingData.email_pemesan}
                        onChange={(e) => bindingState(e, setBookingData, 'email_pemesan')}
                    />
                </div>

                <div className="py-2">
                    <h2 className="text-sm font-medium text-gray-500 pb-2">
                        Nama Tamu
                    </h2>
                    <input
                        type="text"
                        name="nama_tamu"
                        id="nama_tamu"
                        className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                        placeholder="Masukkan nama tamu"
                        required
                        min={0}
                        max={data?.nama_tamu?.length}
                        value={bookingData.nama_tamu}
                        onChange={(e) => bindingState(e, setBookingData, 'nama_tamu')}
                    />
                </div>

                <div className="border-b text-gray-500 border-gray-500 py-2">
                    <div className="w-full flex justify-between gap-5">
                        <div className="w-full">
                            <h2 className="text-sm font-medium text-gray-500 pb-2">
                                Tgl Check In
                            </h2>

                            <input
                                type="date"
                                name="tgl_check_in"
                                id="tgl_check_in"
                                className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                                required
                                value={dataDate.tgl_check_in}
                                disabled
                            />
                        </div>

                        <div className="w-full">
                            <h2 className="text-sm font-medium text-gray-500 pb-2">
                                Tgl Check Out
                            </h2>

                            <input
                                type="date"
                                name="tgl_check_out"
                                id="tgl_check_out"
                                className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                                required
                                value={dataDate.tgl_check_out}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <h2 className="text-sm font-medium text-gray-500 pb-2">
                            Jumlah Kamar
                        </h2>

                        <input
                            type="number"
                            name="jumlah_kamar"
                            id="jumlah_kamar"
                            className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                            placeholder="Masukkan Jumlah Kamar"
                            required
                            min={0}
                            max={data?.kamar?.length}
                            value={bookingData.jumlah_kamar}
                            onChange={(e) => bindingState(e, setBookingData, 'jumlah_kamar')}
                        />
                    </div>
                </div>




                <h1 className="text-lg font-semibold text-gray-500 py-2">
                    Rincian Pesanan
                </h1>

                <div className="bg-gray-200 text-gray-500 rounded-lg py-2">
                    <div className="w-full flex items-center justify-between px-3 pb-1">
                        <h2 className="text-sm font-medium">Tipe Kamar</h2>

                        <p className="text-sm font-semibold text-black">
                            {data?.nama_tipe_kamar}
                        </p>
                    </div>

                    <div className="w-full flex items-center justify-between px-3 pb-1">
                        <h2 className="text-sm font-medium">Jumlah Kamar</h2>

                        <p className="text-sm font-semibold text-black">
                            {bookingData.jumlah_kamar || 0}
                        </p>
                    </div>



                    <div className="w-full flex items-center justify-between px-3 pb-1">
                        <h2 className="text-sm font-medium">Total Hari</h2>

                        <p className="text-sm font-semibold text-black">
                            {diffDays(dataDate.tgl_check_in, dataDate.tgl_check_out)}
                        </p>
                    </div>


                    <div className="w-full flex items-center justify-between px-3 pb-1">
                        <h2 className="text-sm font-medium">Total Harga</h2>

                        <p className="text-sm font-semibold text-black">
                            {totalPrice(
                                dataDate.tgl_check_in,
                                dataDate.tgl_check_out,
                                bookingData.jumlah_kamar,
                                data?.harga
                            )}
                        </p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primary hover:bg-primarydark text-red-500 w-full my-2 py-2 rounded-lg text-base font-medium"
                >
                    Bayar
                </button>
            </div >
        </form >
    );
};

export default SideMainContent;
