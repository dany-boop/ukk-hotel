import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import axios from '@/lib/axios';
import { bindingState } from '@/lib/bindingState';
import Navbar from '@/components/Common/Navbar/Navbar'
import Footer from '@/components/Common/Footer'

function ContainerLogin() {
    const router = useRouter();

    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [isLoginSuccess, setIsLoginSuccess] = useState(0);


    // POST Data Login below here
    const handleLogin = async (e) => {
        e.preventDefault();

        const sendData = { ...data };

        axios
            .post('/user/login', sendData)
            .then((res) => {
                if (res.data.success === 1) {
                    setIsLoginSuccess(1);

                    localStorage.setItem('token', res.data.token);

                    if (res.data.data.role === 'admin') {
                        localStorage.setItem('admin', JSON.stringify(res.data.data));
                        router.push('/admin/dashboard')
                    } else if (res.data.data.role === 'resepsionis') {
                        localStorage.setItem('resepsionis', JSON.stringify(res.data.data));
                        router.push('/resepsionis/dashboard')
                    }
                } else {
                    setIsLoginSuccess(2);
                }
            })
            .catch((err) => {
                setIsLoginSuccess(2);
                console.log(err)
            });
    };
    // POST Data Login above here

    console.log(data);

    return (
        <>
            <Head>
                <title>Login | Wikusama Hotel</title>
            </Head>

            <Navbar />
            <div className="bg-white py-20 lg:py-24">
                <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                    <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Login</h2>

                    <form className="max-w-lg border rounded-lg mx-auto" onSubmit={handleLogin}>
                        {isLoginSuccess === 1 && (
                            <div className="mx-4 md:mx-8 mt-4 md:mt-8 bg-green-500 p-3 rounded">
                                <p className="text-white text-sm font-bold">
                                    Login Sukses, Selamat datang kembali!
                                </p>
                            </div>
                        )}
                        {isLoginSuccess === 2 && (
                            <div className="mx-4 md:mx-8 mt-4 md:mt-8 bg-red-500 p-3 rounded">
                                <p className="text-white text-sm font-bold">
                                    Username atau Password salah, silakan coba kembali!
                                </p>
                            </div>
                        )}
                        <div className="flex flex-col gap-4 p-4 md:p-8">
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
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-yellow-300 rounded outline-none transition duration-100 px-3 py-2"
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
                                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-yellow-300 rounded outline-none transition duration-100 px-3 py-2"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="block bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                            >
                                Log in
                            </button>

                            <div className="flex justify-center items-center relative">
                                <span className="h-px mb-20 bg-gray-300 absolute inset-x-0"></span>
                                <div className="flex justify-center mt-12 items-center bg-gray-100 p-4">
                                    <p className="text-gray-500 text-sm text-center">Don't have an account? <a href='register' className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100">Register</a></p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
                <Footer />
            </div >
        </>
    )
}

export default ContainerLogin