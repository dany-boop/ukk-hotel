import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import axios from '@/lib/axios'
import { headerConfig } from '@/lib/headerConfig'
import { formatLocalTime } from '@/lib/formatlocaltime'
import Sidebar from '@/components/Common/Sidebar'

function ContainerDetailBooking() {
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (localStorage.getItem('admin')) {
            setUser(JSON.parse(localStorage.getItem('admin') || '{}'));
        }

        if (localStorage.getItem('resepsionis')) {
            setUser(JSON.parse(localStorage.getItem('resepsionis') || '{}'));
        }

        if (id) {
            const getData = async () => {
                await axios
                    .get(`/pemesanan/${id}`, headerConfig())
                    .then((res) => {
                        res ? setData(res.data.data) : alert('Data tidak ditemukan!');
                    })
                    .catch((err) => {
                        alert('Data tidak ditemukan!');
                        console.log(err);
                    });
            };

            const getDataById = async () => {
                await axios
                    .get(`/booking/detail/${id}`, headerConfig())
                    .then((res) => {
                        if (res) {
                            setDataRoom(res.data.data);
                        } else {
                            alert('Data tidak ditemukan!');
                        }
                    })
                    .catch((err) => {
                        alert('Data tidak ditemukan!');
                        console.log(err);
                    });
            };

            Promise.all([getData(), getDataById()]);
        }
    }, [id]);


    return (
        <div>ContainerDetailBooking</div>
    )
}

export default ContainerDetailBooking