import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import axios from '@/lib/axios'
import { bindingState } from '@/lib/bindingState'
import { headerConfig } from '@/lib/headerConfig'
import { formatCurrency } from '@/lib/formatCurrency'
import Sidebar from '@/components/Common/Sidebar';

function ContainerRoomAdd() {
    const router = useRouter();

    const [dataTypeRoom, setDataTypeRoom] = useState([]);
    const [token, setToken] = useState('');
    const [data, setData] = useState({
        nomor_kamar: '',
        id_tipe_kamar: 'default',
    });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            setToken(token);
        }

        const fetchData = async () => {
            await axios
                .get('/tipe_kamar', headerConfig())
                .then((res) => setDataTypeRoom(res.data.data))
                .catch((err) => errorToast(err));
        };

        Promise.all([fetchData()]);

        return () => {
            setDataTypeRoom([]);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const sendData = { ...data };

        axios
            .post('/kamar', sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                res.data.success === 1
                if (res.data.success === 1) {
                    alert('Data berhasil ditambah!')
                    setTimeout(() => {
                        router.push('/admin/rooms')
                    }, 1800)
                } else {
                    alert('Terjadi kesalahan saat menambah data!')
                }
            })
            .catch((err) => {
                alert('Terjadi kesalahan saat menambah data!')
                console.log(err);
            });
    };

    // console.log(data)

    return (
        <>
            <Sidebar />
            <main className='bg-white md:ml-64 min-h-screen'>
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full p-10">
                            <section>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="nomor_kamar"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Nomor Kamar
                                        </label>
                                    </div>

                                    <div className="max-w-2xl w-full my-5 lg:mt-0">
                                        <input
                                            type="text"
                                            name="nomor_kamar"
                                            id="nomor_kamar"
                                            value={data.nomor_kamar}
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                            placeholder="Nomor Kamar"
                                            required
                                            onChange={(e) => bindingState(e, setData, 'nomor_kamar')}
                                        />
                                    </div>

                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="id_tipe_kamar"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Tipe Kamar
                                        </label>
                                    </div>

                                    <div className="max-w-2xl w-full my-5 lg:mt-0">
                                        <select
                                            name="id_tipe_kamar"
                                            id="id_tipe_kamar"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                            required
                                            onChange={(e) => bindingState(e, setData, 'id_tipe_kamar')}
                                        >
                                            <option value="default" selected disabled>
                                                Pilih Tipe Kamar
                                            </option>
                                            {dataTypeRoom.map((val, index) => (
                                                <option value={val.id_tipe_kamar} key={index}>
                                                    ID {val.id_tipe_kamar}: {val.nama_tipe_kamar}
                                                    {' => '}
                                                    {formatCurrency(val.harga)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-wrap items-start justify-start">
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 rounded-lg text-white font-segoe font-normal text-base leading-6 px-3 py-2 transition duration-300 ease-in-out"
                                        >
                                            Tambah Data
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}


export default ContainerRoomAdd