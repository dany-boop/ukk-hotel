/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import {
    FaHome,
    FaBuilding,
    FaUserAlt,
    FaShoppingCart,
    FaSignOutAlt,
    FaGlobe,
    FaBed,
    FaUserFriends,
} from 'react-icons/fa';

//import axios from '../../lib/axios';
//import { logout } from '../../lib/logout';
//import { blockAccess } from '../../lib/blockAccess';
//import { classNames } from '../../lib/classNames';

function Sidebar = () {
    // Define Router
    const router = useRouter();
    const { pathname } = router;

    // Required State
    const [collapseShow, setCollapseShow] = useState('hidden');
    const [userName, setUserName] = useState();

    // Get full year
    const year = new Date().getFullYear();

    // Active ClassName for Navigation
    const activeClass =
        'bg-primary rounded text-white text-xs uppercase p-3 mt-2 mb-1 font-bold flex';
    const inActiveClass =
        'text-gray-500 hover:text-gray-400 text-xs uppercase py-3 font-bold flex';

    const isMenuActive = (path: string) => {
        const isDashboard =
            (pathname === '/admin/dashboard' && path === '/admin/dashboard') ||
            (pathname === '/receptionist/dashboard' &&
                path === '/receptionist/dashboard');

        if (isDashboard) {
            return true;
        }

        return (
            (pathname !== '/admin/dashboard' &&
                path !== '/admin/dashboard' &&
                pathname.includes(path)) ||
            (pathname !== '/receptionist/dashboard' &&
                path !== '/receptionist/dashboard' &&
                pathname.includes(path))
        );
    };

    // Access Navigation for Admin
    const adminLinks = [
        {
            path: '/admin/dashboard',
            name: 'Dashboard Admin',
            icon: <FaHome className="mr-2 text-lg" />,
        },
        {
            path: '/admin/type-room',
            name: 'Tipe Kamar',
            icon: <FaBuilding className="mr-2 text-lg" />,
        },
        {
            path: '/admin/rooms',
            name: 'Kamar',
            icon: <FaBed className="mr-2 text-lg" />,
        },
        {
            path: '/admin/booking/add',
            name: 'Pemesanan',
            icon: <FaShoppingCart className="mr-2 text-lg" />,
        },
        {
            path: '/admin/user',
            name: 'User',
            icon: <FaUserFriends className="mr-2 text-lg" />,
        },
    ];

    // Render data from local storage
    useEffect(() => {
        const getAdmin = async () => {
            const admin = JSON.parse(localStorage.getItem('admin') || '{}');

            await axios
                .get('/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                })
                .then(() => setUserName(admin.nama_user))
                .catch((err) => console.log(err));
        };

        Promise.all([getAdmin()]);

        console.log(userName);
    }, []);

    // Block Access if Login level is not Admin
    blockAccess('admin' || 'receptionist', router);

    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden bg-slate-100 flex flex-wrap items-center justify-between relative md:w-64 z-20 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    <Link href="/admin/dashboard" legacyBehavior>
                        {!userName ? (
                            <p className="md:block text-left md:pb-2 text-gray-500 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                                Halo,
                                <span className="animate-pulse bg-gray-300 text-transparent ml-1">
                                    Memuat Data...
                                </span>
                            </p>
                        ) : (
                            <p className="md:block text-left md:pb-2 text-gray-500 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                                Halo, <span className="text-primary">{userName}</span>
                            </p>
                        )}
                    </Link>

                    <button
                        className="cursor-pointer text-gray-500 focus:text-white md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow('bg-slate-100 m-2 py-3 px-6')}
                    >
                        <svg
                            className="block h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Collapse */}
                    <div
                        className={
                            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link href="/admin/dashboard" legacyBehavior>
                                        <a className="md:block text-left text-white md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0">
                                            <h1 className="text-black font-bold text-xl">
                                                <span className="text-primary">Wikusama</span> Hotel
                                            </h1>
                                        </a>
                                    </Link>
                                </div>

                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow('hidden')}
                                    >
                                        <AiOutlineClose />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <h6 className="md:min-w-full text-slate-400 dark:text-gray-600 text-xs uppercase font-bold block mb-1">
                            Navigasi
                        </h6>

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            {adminLinks.map((link, index) => (
                                <li key={index} className="items-center">
                                    <Link href={link.path} legacyBehavior>
                                        <a
                                            className={classNames(
                                                isMenuActive(link.path) ? activeClass : inActiveClass
                                            )}
                                        >
                                            {link.icon}
                                            {link.name}
                                        </a>
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <Link href="/" legacyBehavior>
                                    <a className="text-gray-500 hover:text-gray-400 text-xs uppercase py-3 font-bold flex">
                                        <FaGlobe className="mr-2 text-lg" />
                                        Landing Page
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        <hr className="my-4 md:min-w-full" />

                        {/* Navigation */}
                        <h6 className="md:min-w-full text-slate-400 dark:text-gray-600 text-xs uppercase font-bold block mb-1">
                            Pengaturan
                        </h6>

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                            <li className="items-center">
                                <Link href="/admin/profile" legacyBehavior>
                                    <a
                                        className={classNames(
                                            isMenuActive('/admin/profile')
                                                ? activeClass
                                                : inActiveClass
                                        )}
                                    >
                                        <FaUserAlt className="mr-2 text-lg" />
                                        Profil
                                    </a>
                                </Link>
                            </li>
                            <li className="items-center">
                                <button
                                    className={inActiveClass}
                                    onClick={() => logout('admin', router)}
                                >
                                    <FaSignOutAlt className="mr-2 text-lg" />
                                    Keluar
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="hidden md:flex md:items-center md:justify-between">
                        <small className="text-[#B6B6B6]">
                            &copy; {year} Wikusama Hotel
                        </small>
                    </div>
                </div>
            </nav>

            <div className="z-10 bg-slate-100 hidden md:flex self-end justify-end items-center p-4 sticky top-0 cursor-default">
                <h1 className="text-black font-bold text-xl">
                    <span className="text-primary">Wikusama</span> Hotel
                </h1>
            </div>
        </>
    );
};

export default Sidebar;
