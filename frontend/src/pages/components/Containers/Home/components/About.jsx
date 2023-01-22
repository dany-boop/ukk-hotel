import React from 'react';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

function AboutSection () {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center">
            <div className="mb-10 w-full px-4 lg:w-1/2">
              <img
                src="/assets/img/mockup.png"
                loading="lazy"
                alt="Gedung PT Brand Klinik"
                className="w-full h-full object-cover object-center rounded-xl"
              />
            </div>

            <div className="mb-10 w-full px-4 lg:w-1/2">
              <p className="font-primary font-semibold text-lg xl:text-xl text-primary mb-2">
                Tentang Kami
              </p>

              <h1 className="text-black-800 text-4xl font-bold mb-2">
                PT Brand Klinik
              </h1>

              <p className="lg:w-4/5 text-gray-500 xl:text-lg leading-relaxed mb-5">
                PT Brand Klinik adalah perusahaan yang bergerak di bidang
                kesehatan yang berdiri sejak tahun 2019. PT Brand Klinik
                bergerak di bidang kesehatan dengan menyediakan layanan
                kesehatan yang berkualitas dengan harga yang terjangkau.
              </p>

              <Link href="/" legacyBehavior>
                <a className="inline-block items-center justify-center bg-primary hover:bg-primarydark active:bg-primary focus-visible:ring ring-primary text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-3 py-2">
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