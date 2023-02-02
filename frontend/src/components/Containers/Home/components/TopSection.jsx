import React from 'react'

function TopSection() {
    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="rounded-xl min-h-96 flex justify-center items-center flex-1 shrink-0 bg-gray-100 overflow-hidden shadow-lg relative my-10 py-16 md:py-20 xl:py-48">
                <img
                    src="/assets/img/hotel_pool.jpg"
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