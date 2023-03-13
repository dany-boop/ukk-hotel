import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';

import axios from '../../../../lib/axios';
import { headerConfig } from '../../../../lib/headerConfig';
import { formatLocalTime } from '../../../../lib/formatLocalTime';

const BookingItem = ({
    id_pemesanan,
    nomor_pemesan,
    nama_pemesan,
    email_pemesan,
    nama_tamu,
    nama_tipe_kamar,
    tgl_check_in,
    tgl_check_out,
    tgl_pemesanan,
    jumlah_kamar,
    status_pemesanan,
}) => {
    const router = useRouter();

    const handleDelete = async (id) => {
        alert('Apakah anda yakin ingin menghapus data ini?');

        await axios
            .delete(`/pemesanan/${id}`, headerConfig())
            .then((res) => {
                res.data.status === 1
                    ? alert('Data berhasil dihapus!')
                    : alert('Terjadi kesalahan saat menghapus data!');
            })
            .catch((err) => {
                alert('Terjadi kesalahan saat menghapus data!');
                console.log(err);
            });

        router.reload();
    };

    const badgeColorTransaction = (status) => {
        switch (status) {
            case 'check_out':
                return (
                    <p className="border-2 border-green-500 bg-transparent px-2 py-0.5 rounded-xl text-green-500 text-center whitespace-no-wrap mt-2">
                        Check-out
                    </p>
                );
            case 'check_in':
                return (
                    <p className="border-2 border-yellow-500 bg-transparent px-2 py-0.5 rounded-xl text-yellow-500 text-center whitespace-no-wrap mt-2">
                        Check-in
                    </p>
                );
            default:
                return (
                    <p className="border-2 border-red-500 bg-transparent px-2 py-0.5 rounded-xl text-red-500 text-center whitespace-no-wrap mt-2">
                        Baru
                    </p>
                );
        }
    };

    const diffDays = (chck_in, chck_out) => {
        const checkIn = new Date(chck_in);
        const checkOut = new Date(chck_out);

        const diff = checkOut.getTime() - checkIn.getTime();
        const totalDays = Math.ceil(diff / (1000 * 3600 * 24));

        return totalDays;
    };

    return (
        <div className="container bg-slate-100 rounded-lg p-5 mb-5">
            <div className="flex justify-between">
                <section>
                    <div className="text-left">
                        <h1 className="font-bold text-sm text-slate-500">
                            Nomor Pemesanan
                        </h1>
                        <h1 className="font-bold text-lg text-black">
                            {nomor_pemesan || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">Nama Pemesan</h1>
                        <h1 className="font-bold text-lg text-black">
                            {nama_pemesan || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">Email Pemesan</h1>
                        <h1 className="font-bold text-lg text-black">
                            {email_pemesan || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">Nama Tamu</h1>
                        <h1 className="font-bold text-lg text-black">
                            {nama_tamu || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">
                            Nama Tipe Kamar
                        </h1>
                        <h1 className="font-bold text-lg text-black">
                            {nama_tipe_kamar || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">Lama Menginap</h1>
                        <h1 className="font-bold text-lg text-black">
                            {`${diffDays(tgl_check_in, tgl_check_out)} hari` ||
                                'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="block md:hidden text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">Jumlah Kamar</h1>
                        <h1 className="font-bold text-lg text-black">
                            {`${jumlah_kamar} kamar` || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="block md:hidden text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">
                            Tanggal Transaksi
                        </h1>
                        <h1 className="font-bold text-lg text-black">
                            {formatLocalTime(tgl_pemesanan) || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="block md:hidden text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">
                            Status Transaksi
                        </h1>
                        <h1 className="font-bold text-lg text-black">
                            {badgeColorTransaction(status_pemesanan) || 'Tidak diketahui'}
                        </h1>
                    </div>
                </section>

                <section className="hidden md:block">
                    <div className="text-left">
                        <h1 className="font-bold text-sm text-slate-500">Jumlah Kamar</h1>
                        <h1 className="font-bold text-lg text-black">
                            {`${jumlah_kamar} kamar` || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">
                            Tanggal Transaksi
                        </h1>
                        <h1 className="font-bold text-lg text-black">
                            {formatLocalTime(tgl_pemesanan) || 'Tidak diketahui'}
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm text-slate-500">
                            Status Pengerjaan
                        </h1>
                        <h1 className="font-bold text-lg text-black">
                            {badgeColorTransaction(status_pemesanan) || 'Tidak diketahui'}
                        </h1>
                    </div>
                </section>

                <section>
                    <Link
                        href={`/admin/booking/detail/${id_pemesanan}`}
                        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    >
                        <FaInfoCircle className="mr-2" /> Detail
                    </Link>

                    <Link
                        href={`/admin/Booking/edit/${id_pemesanan}`}
                        className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
                    >
                        <FaEdit className="mr-2" /> Ubah
                    </Link>

                    <button
                        type="button"
                        className="flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
                        onClick={() => handleDelete(id_pemesanan)}
                    >
                        <FaTrash className="mr-2" /> Hapus
                    </button>
                </section>
            </div>
        </div>
    );
};

export default BookingItem;