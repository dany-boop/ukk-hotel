import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import axios from '@/lib/axios';
import { bindingState } from '@/lib/bindingState';
import Navbar from '@/components/Common/Navbar/Navbar'
import Footer from '@/components/Common/Footer'

function ContainerRegister() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [storeSuccess, setStoreSuccess] = useState(false);
    const [storeFailed, setStoreFailed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sendData = {
            nama_user: name,
            // foto: null,
            email,
            password,
            role
        };

        axios
            .post('/user', sendData)
            .then(() => {
                setStoreSuccess(true);
                setStoreFailed(false);

                router.push('/admin/member');
            })
            .catch((err) => console.log(err));
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

                    <form className="max-w-lg border rounded-lg mx-auto" onSubmit={handleSubmit}>
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
                            <div>
                                <label
                                    htmlFor="name"
                                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                                >
                                    Nama 
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => bindingState(e, setName, "name")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
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
                                    value={email}
                                    onChange={(e) => bindingState(e, setEmail, "email")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
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
                                    value={password}
                                    onChange={(e) => bindingState(e, setPassword, "password")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
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
                                    value={role}
                                    onChange={(e) => bindingState(e, setRole, "role")}
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                                >
                                    <option disabled selected>Pilih Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="resepsionis">Resepsionis</option>
                                </select>
                            </div>

                            <button type="submit" className="block bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Register</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ContainerRegister