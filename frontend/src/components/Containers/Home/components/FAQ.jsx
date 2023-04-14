import React from 'react';

function FAQ ()  {
  return (
    <section className="py-10 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center">
            <div className="mb-5 lg:mb-0 w-full px-4 lg:w-1/2">
              <h1 className="font-primary font-semibold text-2xl lg:text-3xl text-primary mb-2">
                Pertanyaan Umum
              </h1>

              <p className="text-gray-500 xl:text-lg leading-relaxed">
                Pertanyaan paling umum tentang cara kerja klinik kami dan apa
                yang dapat kami lakukan untuk Anda.
              </p>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="rounded-xl bg-gray-100 shadow-lg p-5">
                <div className="mb-0 md:mb-2">
                  <details className="mb-4">
                    <summary className="font-semibold text-yellow-500 bg-white rounded-md py-2 px-4 cursor-pointer">
                      Bagaimana Saya bisa memesan kamar hotel?
                    </summary>

                    <p className="px-2 text-justify">
                      Proses Booking di Wikusama Hotel sangat mudah hanya
                      sekali klik saja. masukkan tanggal
                      check-in dan check-out. Lalu klik &quot;Cari
                      sekarang!&quot; dan daftar pilihan Anda akan ditampilkan.
                    </p>
                  </details>
                </div>

                <div className="mb-0 md:mb-2">
                  <details className="mb-4">
                    <summary className="font-semibold text-yellow-500 bg-white rounded-md py-2 px-4 cursor-pointer">
                      Bagaimana Saya bisa mengajukan pemohonan khusus?
                    </summary>

                    <p className="px-2 text-justify">
                      Anda dapat mengirim email kepada kami di{' '}
                      <a
                        href="mailto:cs@wikusama.com"
                        target={'_blank'}
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        cs@wikusamahotel.com
                      </a>{' '}
                      atau langsung menghubungi Hotel untuk setiap permohonan
                      khusus setelah pemesanan hotel Anda dikonfirmasi. Setiap
                      permohonan khusus tergantung pada ketersediaan kamar hotel
                      saat check-in. Tidak ada jaminan yang bisa diberikan.
                    </p>
                  </details>
                </div>

                <div className="mb-0 md:mb-2">
                  <details className="mb-4">
                    <summary className="font-semibold text-yellow-500 bg-white rounded-md py-2 px-4 cursor-pointer">
                      Bisakah saya memesan hotel melalui telepon atau email?
                    </summary>

                    <p className="px-2 text-justify">
                      Silakan hubungi hotline Penjualan kami di +6281234567890
                      atau Anda bisa kirim email ke{' '}
                      <a
                        href="mailto:sales@wikusama.com"
                        target={'_blank'}
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        sales@wikusamahotel.com
                      </a>
                    </p>
                  </details>
                </div>

                <div className="mb-0 md:mb-0">
                  <details className="">
                    <summary className="font-semibold text-yellow-500 bg-white rounded-md py-2 px-4 cursor-pointer">
                      Berapa banyak tamu yang diizinkan untuk satu kamar hotel?
                    </summary>

                    <p className="px-2 text-justify">
                      Kapasitas hunian kamar hotel tergantung pada jenis
                      kamarnya. Hotel mungkin akan membebankan biaya tambahan
                      untuk tamu tambahan. Tanyakan kepada hotel yang
                      bersangkutan atau hubungi kami untuk mendapatkan bantuan.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
