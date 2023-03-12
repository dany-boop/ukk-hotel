import { useState, useEffect } from 'react';
import { FaEdit, FaLock, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from '../../../../lib/axios';
import { headerConfig } from '../../../../lib/headerConfig';

function AllRoomSection() {
    const [dataLogin, setDataLogin] = useState({});
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('admin')) {
            setDataLogin(JSON.parse(localStorage.getItem('admin') || '{}'));
        }

        if (localStorage.getItem('resepsionis')) {
            setDataLogin(JSON.parse(localStorage.getItem('resepsionis') || '{}'));
        }

        const getData = async () => { 
            await axios
                .get('/kamar', headerConfig())
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        Promise.all([getData()]);
    }, []);

    const handleDelete = async (id) => {
        alert('Apakah anda yakin ingin menghapus data ini?');

        await axios
            .delete(`/kamar/${id}`, headerConfig())
            .then((res) => {
                if (res.data.success === 1) {
                    alert('Data berhasil dihapus!')
                    setTimeout(() => {
                        router.push('/admin/rooms')
                    }, 500)
                } else {
                    alert('Terjadi kesalahan saat menghapus data!')
                }
            })
            .catch((err) => {
                alert('Terjadi kesalahan saat menghapus data!')
                console.log(err);
            });
    };

    console.log(data)

    return (
        <section className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <table className="min-w-full leading-normal">
                <thead className="border-gray-200 bg-primary">
                    <tr>
                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            No
                        </th>

                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Foto
                        </th>

                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Nama Tipe Kamar
                        </th>

                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            No Kamar
                        </th>

                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Aksi
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {!data.length ? (
                        <tr>
                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                    <p className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                        this text will not displayed
                                    </p>
                                </div>
                            </td>

                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                    <p className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                        this text will not displayed
                                    </p>
                                </div>
                            </td>

                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                    <p className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                        this text will not displayed
                                    </p>
                                </div>
                            </td>

                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                    <p className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                        this text will not displayed
                                    </p>
                                </div>
                            </td>

                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                    <p className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                        this text will not displayed
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        data.map((val, index) => (
                            <tr key={index}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                    <div className="flex items-center">
                                        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                    </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                    <div className="flex items-center">
                                        <img
                                            src={val.tipe_kamar.foto || '/assets/img/no-image.png'}
                                            alt="Room Type Image"
                                            loading="lazy"
                                            className="w-[200px] h-[100px] object-cover object-center"
                                        />
                                    </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                    <div className="flex items-center">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {val.tipe_kamar.nama_tipe_kamar}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                    <div className="flex items-center">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {val.nomor_kamar}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                    {dataLogin.role !== 'admin' ? (
                                        <div className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide mt-2 cursor-not-allowed">
                                            <FaLock className="mr-2" /> Perlu Akses
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                href={`/admin/rooms/edit/${val.id_kamar}`}
                                                className="w-lg flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide"
                                            >
                                                <FaEdit className="mr-2" /> Ubah
                                            </Link>

                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
                                                onClick={() => handleDelete(val.id_kamar)}
                                            >
                                                <FaTrash className="mr-2" /> Hapus
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default AllRoomSection;
