import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useReactToPrint } from 'react-to-print'
import Head from 'next/head'
import Link from 'next/link'

import axios from '@/lib/axios'
import { headerConfig } from '@/lib/headerConfig'
import { formatCurrency } from '@/lib/formatCurrency'
import { formatLocalTime } from '@/lib/formatlocaltime'
import { diffDays } from '@/lib/diffDays'
import { totalPrice } from '@/lib/ttlPrice'

function Containerinvoice() {
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
                    .get(`/booking/${id}`, headerConfig())
                    .then((res) => {
                        res ? setData(res.data.data) : errorToast('Data tidak ditemukan!');
                    })
                    .catch((err) => {
                        errorToast('Data tidak ditemukan!');
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
                            errorToast('Data tidak ditemukan!');
                        }
                    })
                    .catch((err) => {
                        errorToast('Data tidak ditemukan!');
                        console.log(err);
                    });
            };

            Promise.all([getData(), getDataById()]);
        }
    }, [id]);
    const componentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentsRef?.current,
    });

    const subTotal = (totalRoom, price) => {
        return formatCurrency(totalRoom * price);
    };



    return (
    )
}

export default Containerinvoice