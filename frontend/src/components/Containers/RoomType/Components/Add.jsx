import React, { useState } from 'react'

import axios from '@/lib/axios'
import { bindingState } from '@/lib/bindingState'
import { headerConfig } from '@/lib/headerConfig'
import Sidebar from '@/components/Common/Sidebar';

function ContainerTypeRoomAdd() {
    const [data, setData] = useState({
        nama_tipe_kamar: '',
        harga: '',
        foto: '',
        deskripsi: '',
    });
    const [image, setImage] = useState('/assets/img/template-img-room.png');

    const handleImage = (e) => {
        let foto = e.target.files[0];
        setImage(URL.createObjectURL(foto));
        setData({ ...data, foto });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const sendData = { ...data };

        axios
            .post('/tipe_kamar', sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                res.data.success === 1
                    ? alert('Data berhasil ditambahkan!')
                    : alert('Terjadi kesalahan saat menambah data!')
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

            <main className='bg-white dark:bg-gray-900 md:ml-64 min-h-screen'>
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full p-10">
                            <section>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <div>
                                            <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Foto Tipe Kamar
                                            </label>

                                            <img
                                                src={image}
                                                alt="Image Tipe Kamar Update"
                                                className="w-full lg:w-[450px] h-[300px] object-cover object-center mt-2"
                                            />
                                        </div>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="image"
                                                id="image"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                required
                                                onChange={handleImage}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="nama_tipe_kamar"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Nama Tipe Kamar
                                        </label>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                            <input
                                                type="text"
                                                name="nama_tipe_kamar"
                                                id="nama_tipe_kamar"
                                                value={data.nama_tipe_kamar}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                placeholder="Nama Tipe Kamar"
                                                required
                                                onChange={(e) => bindingState(e, setData, 'nama_tipe_kamar')}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="harga"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Harga
                                        </label>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                            <input
                                                type="text"
                                                name="harga"
                                                id="harga"
                                                value={data.harga}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                placeholder="Harga"
                                                required
                                                onChange={(e) => bindingState(e, setData, 'harga')}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="deskripsi"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Deskripsi
                                        </label>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0 border rounded-xl p-2">
                                            <textarea name="deskripsi" id="deskripsi" cols="10" rows="10" className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm' placeholder='Masukkan Deskripsi...' required onChange={(e) => bindingState(e, setData, 'deskripsi')} />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-end justify-end">
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

export default ContainerTypeRoomAdd