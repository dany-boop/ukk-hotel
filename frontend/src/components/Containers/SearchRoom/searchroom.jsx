import { useState } from 'react';
import { FaHotel, FaSearch } from 'react-icons/fa';
import Head from 'next/head';

import axios from '@/lib/axios';
import { bindingState } from '@/lib/bindingState';
import Navbar from '@/components/Common/Navbar/Navbar';
import Footer from '@/components/Common/Footer';
import RoomCardSection from './components/RoomCard';


function ContainerSearchRoom() {
    const [dataDate, setDataDate] = useState({
        tgl_check_in: '',
        tgl_check_out: '',
    });
    const [dataRoom, setDataRoom] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        localStorage.setItem('tgl_check_in', JSON.stringify(dataDate.tgl_check_in));
        localStorage.setItem(
            'tgl_check_out',
            JSON.stringify(dataDate.tgl_check_out)
        );

        const token = localStorage.getItem('token');

        const sendData = { ...dataDate };

        await axios
            .post('/filtering', sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                if (res) {
                    setDataRoom(res.data.kamar);
                } else {
                    alert('Terjadi kesalahan! Silahkan coba lagi');
                }
            })
            .catch((err) => {
                alert('Oops! Silahkan masuk atau daftar terlebih dahulu!');

                localStorage.removeItem('tgl_check_in');
                localStorage.removeItem('tgl_check_out');

                setDataDate({
                    tgl_check_in: '',
                    tgl_check_out: '',
                });

                console.log(err);
            });
    };



    return (
        <>
            <Head>
                <title>Cari Kamar - Wikusama Hotel</title>
            </Head>

            <Navbar />

            <main className="py-20">
                <section className="py-10 lg:py-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="container">
                            <div className="w-full px-4">
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white rounded-lg"
                                >
                                    <div className="py-5 md:flex md:justify-between px-4">
                                        <div className="flex items-center">
                                            <FaHotel className="text-primary text-2xl mr-2" />

                                            <h2 className="text-xl font-semibold lg:text-2xl">
                                                Temukan Kamar Disini
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="w-full mb-5 gap-5 flex flex-col lg:flex-row items-center justify-between py-5 px-4">
                                        <div className="w-full">
                                            <label
                                                htmlFor="tgl_check_in"
                                                className="block text-lg font-medium text-yellow-400 mb-2"
                                            >
                                                Tanggal Check In
                                            </label>

                                            <input
                                                type="date"
                                                name="tgl_check_in"
                                                id="tgl_check_in"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm"
                                                required
                                                value={dataDate.tgl_check_in}
                                                onChange={(e) =>
                                                    bindingState(e, setDataDate, 'tgl_check_in')
                                                }
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="tgl_check_out"
                                                className="block text-lg font-medium text-yellow-400 mb-2"
                                            >
                                                Tanggal Check Out
                                            </label>

                                            <input
                                                type="date"
                                                name="tgl_check_out"
                                                id="tgl_check_out"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm"
                                                required
                                                value={dataDate.tgl_check_out}
                                                onChange={(e) =>
                                                    bindingState(e, setDataDate, 'tgl_check_out')
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-5 px-4 border-t-2 border-gray-200">
                                        <div className="flex items-center gap-2">

                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 active:bg-primary focus-visible:ring ring-primary text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-5 py-3"
                                            >
                                                <FaSearch className="mr-2 mt-1 text-sm" />
                                                Cari Kamar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {dataRoom.length > 0 ? (
                    <RoomCardSection dataRoom={dataRoom} />
                ) : (
                    <section className="py-5">
                        <div className="max-w-7xl mx-auto">
                            <div className="w-full px-4 flex flex-wrap items-center justify-center">
                                <h1 className="block text-2xl font-medium text-gray-500 ">
                                    Pilih Tanggal!
                                </h1>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}

export default ContainerSearchRoom