import React, { useState, useEffect } from 'react';


function PreviewProfile() {
    const [data, setData] = useState();

    useEffect(() => {
        if (localStorage.getItem('admin')) {
            setData(JSON.parse(localStorage.getItem('admin') || '{}'));
        }

        if (localStorage.getItem('resepsionis')) {
            setData(JSON.parse(localStorage.getItem('resepsionis') || '{}'));
        }
    }, []);


    return (
        <section>
            <div className="avatar-and-cover">
                <div className="cover">
                    <div className="image">
                        <img
                            src="/assets/img/cover-default.png"
                            alt="Cover Image User"
                            className="h-96 lg:h-[400px]"
                        />
                    </div>
                </div>

                <div className="avatar">
                    <div className="image">
                        <img
                            src={data?.foto}
                            alt="Avatar User Profile"
                        />
                    </div>

                    <div className="mt-2">
                        <h4 className="font-semibold text-2xl leading-7 mb-2">
                            {data?.nama_user || data?.nama || 'Tidak ada data'}
                        </h4>

                        <hr />

                        <p>{data?.email || 'Tidak ada data'}</p>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex flex-col">
                    <h4 className="text-xl font-bold text-primary mb-5">
                        Informasi Pribadi
                    </h4>

                    <div className="mb-5 flex flex-wrap items-center justify-between">
                        <h2 className="block text-sm font-medium text-gray-500 mb-2">
                            Nama User
                        </h2>

                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={data?.nama_user || data?.nama || 'Tidak ada data'}
                                className="block w-full border text-gray-500 border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="mb-5 flex flex-wrap items-center justify-between">
                        <h2 className="block text-sm font-medium text-gray-500 mb-2">
                            Email User
                        </h2>

                        <div className="max-w-2xl w-full mt-3 lg:mt-0">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data?.email || 'Tidak ada data'}
                                className="block w-full border text-gray-500 border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                                disabled
                            />
                        </div>
                    </div>

                    {data?.role === 'admin' ||
                        (data?.role === 'resepsionis' && (
                            <div className="mb-5 flex flex-wrap items-center justify-between">
                                <h2 className="block text-sm font-medium text-gray-500 mb-2">
                                    Jabatan User
                                </h2>

                                <div className="max-w-2xl w-full mt-3 lg:mt-0">
                                    <input
                                        type="text"
                                        name="role"
                                        id="role"
                                        value={data?.role || 'Tidak ada data'}
                                        className="block w-full border text-gray-500 border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                                        disabled
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    )
}

export default PreviewProfile