import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import axios from '@/lib/axios'
import { headerConfig } from '@/lib/headerConfig'
import { formatCurrency } from '@/lib/formatCurrency'
import { bindingState } from '@/lib/bindingState'
import Sidebar from '@/components/Common/Sidebar'

const ContainerEditUser = () => {
    const [oldData, setOldData] = useState({});
    const [data, setData] = useState({
        nama_user: '',
        email: '',
        password: '',
        confirmPass: '',
        role: 'default',
        foto: '',
    });
    const [image, setImage] = useState('/assets/img/template-img.png');

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id > 0) {
            axios
                .get(`/user/${id}`, headerConfig())
                .then((res) => {
                    setOldData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert('data gaada!')
            setTimeout(() => {
                router.push('/admin/user')
            }, 1500)
        }

        return () => {
            setOldData({});
            setData({
                nama_user: '',
                email: '',
                password: '',
                confirmPass: '',
                role: 'default',
                foto: '',
            });
            setImage('/assets/img/template-img.png');
        };
    }, [id, router])

    const handleImage = (e) => {
        // eslint-disable-next-line prefer-const
        let foto = e.target.files[0];
        setImage(URL.createObjectURL(foto));
        setData({ ...data, foto });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const sendData = {
            id_user: oldData.id_user,
            ...data,
        };

        axios
            .put('/user', sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                if (res.data.success === 1) {
                    //   successToast('Berhasil mengubah data!');
                    setTimeout(() => {
                        router.push('/admin/user');
                    }, 1500);
                } else {
                    //   errorToast('Gagal mengubah data! Silahkan coba lagi');
                }
            })
            .catch((err) => {
                // errorToast('Gagal mengubah data! Silahkan coba lagi');
                console.log(err);
            });
    };

    // console.log(data)

    return (
        <>
            <Head>
                <title>Ubah Data User - Wikusama Hotel</title>
            </Head>

            <Sidebar />

            <main className='bg-white dark:bg-gray-900 md:ml-64 min-h-screen'>
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full p-10">
                            <h2 className="text-2xl font-bold text-primary mb-5">
                                Ubah Data User
                            </h2>

                            <section className="bg-white p-5 rounded-lg shadow-md">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <div>
                                            <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-500"
                                            >
                                                Foto User
                                            </label>

                                            <img
                                                src={image}
                                                alt="Image User Update"
                                                className="w-[200px] h-[200px] object-cover object-center mt-2"
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
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Nama User
                                        </label>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                            <input
                                                type="text"
                                                value={oldData.nama_user}
                                                className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                                                disabled
                                            />

                                            <input
                                                type="text"
                                                name="nama_user"
                                                id="nama_user"
                                                value={data.nama_user}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                placeholder="Nama User"
                                                required
                                                onChange={(e) => bindingState(e, setData, 'nama_user')}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Email
                                        </label>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                            <input
                                                type="text"
                                                value={oldData.email}
                                                className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                                                disabled
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={data.email}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                placeholder="Email"
                                                required
                                                onChange={(e) => bindingState(e, setData, 'email')}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Password
                                        </label>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={data.password}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                                                placeholder="Password Baru"
                                                required
                                                onChange={(e) => bindingState(e, setData, 'password')}
                                            />

                                            <input
                                                type="password"
                                                name="confirmPass"
                                                id="confirmPass"
                                                value={data.confirmPass}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                                                placeholder="Konfirmasi Password Baru"
                                                required
                                                onChange={(e) =>
                                                    bindingState(e, setData, 'confirmPass')
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5 flex flex-wrap items-center justify-between">
                                        <label
                                            htmlFor="role"
                                            className="block text-sm font-medium text-gray-500"
                                        >
                                            Jabatan
                                        </label>

                                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                            <input
                                                type="text"
                                                value={oldData.role}
                                                className="capitalize block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm mb-2"
                                                disabled
                                            />

                                            <select
                                                name="role"
                                                id="role"
                                                value={data.role}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                                                required
                                                onChange={(e) => bindingState(e, setData, 'role')}
                                            >
                                                <option value="default" selected disabled>
                                                    Pilih Jabatan
                                                </option>
                                                <option value="admin">Admin</option>
                                                <option value="resepsionis">Resepsionis</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-end justify-end">
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 rounded-lg text-white font-segoe font-normal text-base leading-6 px-3 py-2 transition duration-300 ease-in-out"
                                        >
                                            Ubah Data
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

export default ContainerEditUser