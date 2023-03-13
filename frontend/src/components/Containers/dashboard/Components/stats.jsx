import React from 'react';

const StatsSection = ({
    dataTypeRoom,
    dataRoom,
    dataUser,
    dataBooking,
}) => {
    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 py-5 gap-4">
                <div className="bg-primary shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-yellow-500 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-yellow-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg
                            width="30"
                            height="30"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            className="fill-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                        >
                            <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                        </svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{dataTypeRoom.length}</p>
                        <p>Total Tipe Kamar</p>
                    </div>
                </div>

                <div className="bg-primary shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-yellow-500 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-yellow-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg
                            width="30"
                            height="30"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="fill-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                        >
                            <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                        </svg>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl">{dataBooking.length}</p>
                        <p>Total Pemesanan</p>
                    </div>
                </div>

                <div className="bg-primary shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-yellow-500 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-yellow-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg
                            width="30"
                            height="30"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            className="fill-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                        >
                            <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                        </svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{dataRoom.length}</p>
                        <p>Total Kamar</p>
                    </div>
                </div>
                <div className="bg-primary shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-yellow-500 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-yellow-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg
                            width="30"
                            height="30"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="fill-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                        >
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{dataUser.length}</p>
                        <p>Total Petugas</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
