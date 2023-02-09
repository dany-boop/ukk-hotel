import React from 'react'

function TopSection() {
    return (
        <section className="max-w-full mx-auto px-4">
            <div className="min-h-min flex justify-center items-center flex-1 shrink-0 bg-gray-100 overflow-hidden shadow-lg relative my-1 py-16 md:py-40 xl:py-72">
                <img
                    src="/assets/img/hotel_pool.jpg"
                    loading="lazy"
                    alt="Hotel Pool"
                    className="w-full h-full object-cover object-center absolute inset-0 opacity-80"
                />

                <div className="border-8 border-yellow-500 sm:max-w-xl flex flex-col items-center relative p-4">
                    <p className="font-semibold text-white text-lg sm:text-xl text-center mb-4 md:mb-8">
                        Very proud to introduce
                    </p>
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-10 md:mb-12">
                        Wikusama Hotel
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default TopSection