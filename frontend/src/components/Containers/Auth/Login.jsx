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
                        router.push('/receptionist/dashboard')
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
            <div className="relative max-w-full mx-auto px-4 ">
                <div>
                    <img
                        src='/assets/img/cover-default.png'
                        className="absolute inset-0 object-cover object-center "
                        alt="bg-private"
                    />
                    <section class="relative">
                        <div className='container px-4 py-40 mx-auto'>
                            <div >
                            </div>
                            <div className='text-center pt-28'>
                                <h2 className='sm:text-3xl text-xl font-serif text-center title-font text-white bg-clip-text mb-4'>Welcome To Wikusama Hotel</h2>
                            </div>
                            <div className='text-center pt-20'>
                                <h4 className='sm:text-xl text-md font-thin text-center  text-white bg-clip-text mb-2'>  Login </h4>
                            </div>
                            <div className='max-w-xl mx-auto py-1 px-4 sm:px-6 lg:px-8'>
                                <form className="max-w-lg bg-white border rounded-lg mx-auto" onSubmit={handleLogin}>
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
                                                className="w-full bg-gray-50 text-gray-500 border focus:ring ring-yellow-300 rounded outline-none transition duration-100 px-3 py-2"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="block bg-emerald-700 hover:bg-amber-500 active:bg-yellow-600 focus-visible:ring ring-yellow-500 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                                        >
                                            Log in
                                        </button>

                                        {/* <div className="flex justify-center items-center relative">
                                        <span className="h-px mb-20 bg-gray-300 absolute inset-x-0"></span>
                                        <div className="flex justify-center mt-12 items-center bg-gray-100 p-4">
                                            <p className="text-gray-500 text-sm text-center">Don't have an account? <a href='register' className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100">Register</a></p>
                                        </div>
                                    </div> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default ContainerLogin