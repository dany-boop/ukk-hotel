import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import axios from '@/lib/axios';
import { bindingState } from '@/lib/bindingState'
import Navbar from '@/components/Common/Navbar/Navbar'
import Footer from '@/components/Common/Footer'

function ContainerRegister() {
    const router = useRouter();

    const [data, setData] = useState({
        nama_user: '',
        email: '',
        password: '',
        foto: '',
        role: 'default'
    })

    const [image, setImage] = useState('https://fakeimg.pl/200x200');
    const [storeSuccess, setStoreSuccess] = useState(false);
    const [storeFailed, setStoreFailed] = useState(false)

    const handleImage = (e) => {
        //eslint-disable-next-line prefer-const
        let foto = e.target.files[0];
        setImage(URL.createObjectURL(foto));
        setData({ ...data, foto });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sendData = { ...data };

        await axios
            .post('/user', sendData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                if (res.data.success === 1) {
                    setStoreSuccess(true)
                    setTimeout(() => {
                        router.push('/auth/login');
                    }, 1800);
                } else {
                    setStoreFailed(false);
                }
            })
            .catch((err) => {
                setStoreFailed(false);
                console.log(err);
            });
    };


    return (
        <>
            <Head>
                <title>Register | Wikusama Hotel</title>
            </Head>

            <Navbar />
            <div className="bg-white py-10 lg:py-14">
                <div className="max-w-screen-2xl px-4 md:px-8 py-10 mx-auto">
                    <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Register</h2>

                    <form className="max-w-lg border rounded-lg mx-auto" onSubmit={handleSubmit} enctype="multipart/form-data">
                        {storeFailed && (
                            <div className="mx-4 md:mx-8 mt-4 md:mt-8 bg-red-500 p-3 rounded">
                                <p className="text-white text-sm font-bold">
                                    Username atau Password toxic, silakan coba kembali!
                                </p>
                            </div>
                        )}
                        {storeSuccess && (
                            <div className="mx-4 md:mx-8 mt-4 md:mt-8 bg-green-500 p-3 rounded">
                                <p className="text-white text-sm font-bold">
                                    Register Success, Silahkan Login
                                </p>
                            </div>
                        )}
                        <div className="flex flex-col gap-4 p-4 md:p-8">
                            <div className='flex justify-center items-center'>
                                <img
                                    src={image}
                                    loading="lazy"
                                    alt="Image User Update"
                                    className="w-[200px] h-[200px] object-cover object-center mt-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="nama_user"
                                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="nama_user"
                                    name="nama_user"
                                    value={data.nama_user}
                                    onChange={(e) => bindingState(e, setData, "nama_user")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-yellow-500  rounded outline-none transition duration-100 px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => bindingState(e, setData, "email")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-yellow-500  rounded outline-none transition duration-100 px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => bindingState(e, setData, "password")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-yellow-500  rounded outline-none transition duration-100 px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="image"
                                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                                >
                                    Foto
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    onChange={handleImage}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-yellow-500  rounded outline-none transition duration-100 px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="role"
                                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                                >
                                    Role
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => bindingState(e, setData, "role")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-yellow-500  rounded outline-none transition duration-100 px-3 py-2"
                                >
                                    <option value="default" selected disabled>Pilih Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="resepsionis">Resepsionis</option>
                                </select>
                            </div>

                            <div>
                                <button type="submit" className="mt-10 flex justify-between items-center bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default ContainerRegister