import React from 'react';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

function AboutSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center">
            <div className="mb-10 w-full px-4 lg:w-1/2">
              <img
                src="/assets/img/hotel_lounge.jpg"
                loading="lazy"
                alt="Gedung Wikusama Hotel"
                className="w-full h-full object-cover object-center rounded-xl"
              />
            </div>

            <div className="mb-10 w-full px-4 lg:w-1/2">
              <p className="font-semibold text-lg xl:text-xl text-yellow-500 mb-2">
                Tentang Kami
              </p>

              <h1 className="text-black-800 text-4xl font-bold mb-2">
                Wikusama Hotel
              </h1>

              <p className="text-gray-500 xl:text-lg text-justify leading-relaxed mb-5">
                Wikusama Hotel adalah perusahaan yang bergerak di bidang
                akomodasi yang berdiri sejak tahun 2023. Wikusama Hotel
                bergerak di bidang akomodasi dengan menyediakan layanan
                akomodasi penginapan yang berkualitas dengan harga yang
                terjangkau.
              </p>

              <Link href="/" legacyBehavior>
                <a className="inline-block items-center justify-center bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-500 focus-visible:ring ring-yellow-500 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-3 py-2">
                  Lihat Selengkapnya <FaAngleRight className="inline-block" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;