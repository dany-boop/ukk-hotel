import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Common/Navbar/Navbar';
import Footer from '@/components/Common/Footer';

const ContainerNotFound = () => {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan</title>
        <meta name="robots" content="follow, index" />
        <meta
          name="description"
          content="Mohon maaf, halaman yang Anda cari tidak dapat kami temukan."
        />
        <meta property="og:url" content="https://klinik-next.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Wikusama Hotel" />
        <meta
          property="og:description"
          content="Mohon maaf, halaman yang Anda cari tidak dapat kami temukan."
        />
        <meta property="og:title" content="Brand Klinik" />
        <meta
          property="og:image"
          content="http://klinik-next.vercel.app/assets/svg/undraw_not_found.svg"

        />
        <link rel="canonical" href="https://wikusamahotel.com/" />
      </Head>

      <Navbar />

      <main className="py-20">
        <section className="py-20">
          <div className="max-w-7xl mx-auto">
            <div className="container">
              <div className="flex flex-wrap-reverse items-center justify-center">
                <div className="w-full px-4 lg:w-1/2">
                  <div className="flex flex-col justify-center items-center sm:items-start md:py-24 lg:py-32">
                    <p className="text-primary text-sm md:text-base text-red-600 font-semibold uppercase mb-4">
                      Error 404
                    </p>
                    <h1 className="text-gray-800 text-2xl md:text-3xl font-bold text-center sm:text-left mb-2">
                      Halaman Tidak Ditemukan
                    </h1>

                    <p className="text-gray-500 md:text-lg text-center sm:text-left mb-8">
                      Mohon maaf, halaman yang Anda cari tidak dapat kami
                      temukan.
                    </p>

                    <Link href="/" legacyBehavior>
                      <a className="inline-block bg-primary hover:bg-primarydark focus-visible:ring ring-primary text-white active:bg-primary text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-5 py-3">
                        Kembali ke Beranda
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="w-full px-4 lg:w-1/2">
                  <div className="mb-10 lg:mb-0">
                    <img
                      src="/assets/svg/bad-gateway.svg"
                      loading="lazy"
                      alt="Photo by @heydevn"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContainerNotFound;