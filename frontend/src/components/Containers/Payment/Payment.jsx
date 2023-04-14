import React,{ useState } from 'react';
import Head from 'next/head';

import Navbar from '@/components/Common/Navbar/Navbar';
import Footer from '@/components/Common/Footer';
import { paymentMethod } from '@/data/paymentMethods';
import DetailTransactionSection from './components/DetailTransactions';

function ContainerPaymentMethod  ()  {
  const [isShow, setIsShow] = useState(false);
  const [paymentMethodName, setPaymentMethodName] = useState();

  const handleButton = (e) => {
    const target = e.target;
    const name = target.textContent || target.alt;

    setIsShow(true);
    setPaymentMethodName(name);
  };

  return (
    <>
      <Head>
        <title>Pilih Metode Pembayaran - Wikusama Hotel</title>
      </Head>

      {/* <ToastContainer autoClose={1500} /> */}

      <Navbar />

      <main className="py-20">
        <section className="py-10">
          <div className="max-w-7xl mx-auto">
            <div className="container">
              <div className="grid grid-cols-8">
                <section className="col-span-8 lg:col-span-5 mb-5 lg:mb-0">
                  <div className="w-full px-4">
                    <div className="border border-primary bg-primary text-white p-5 rounded-t-lg">
                      <h1>Pilih Metode Pembayaran</h1>
                    </div>

                    {paymentMethod?.map((a, i) => (
                      <button
                        onClick={(e) => handleButton(e)}
                        id={a.name}
                        className="w-full border"
                        key={i}
                      >
                        <div className="flex flex-wrap items-center justify-between p-5">
                          <h3>{a.name}</h3>

                          <div className="max-w-[150px]">
                            <img
                              src={a.img}
                              alt={a.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {isShow === true ? (
                  <DetailTransactionSection
                    paymentMethodName={paymentMethodName}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContainerPaymentMethod;
