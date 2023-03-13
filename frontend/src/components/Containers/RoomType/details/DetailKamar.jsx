import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import axios from '@/lib/axios';
import Navbar from '@/components/Common/Navbar/Navbar';
import Footer from '@/components/Common/Footer';
import MainContentSection from './Maincontent';
// import ReviewsSection from './components/Reviews';

function ContainerDetailRoomType() {
    const [data, setData] = useState();

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`/tipe_kamar/${id}`)
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert('Data tidak ditemukan!');
            setTimeout(() =>
                1500);
        }

        return () => {
            setData({
                id_tipe_kamar: 0,
                nama_tipe_kamar: '',
                id: '',
                harga: 0,
                deskripsi: '',
                foto: '',
                kamar: [],
            });
        };
    }, [router]);

    return (
        <>
            <Head>
                <title>Detil Kamar {data?.nama_tipe_kamar} - Wikusama Hotel</title>
            </Head>

            <Navbar />

            <main className="pt-20">
                <MainContentSection data={data} />
                {/* <ReviewsSection /> */}
            </main>

            <Footer />
        </>
    );
};

export default ContainerDetailRoomType;
