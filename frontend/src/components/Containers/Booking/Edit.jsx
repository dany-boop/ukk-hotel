import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import axios from '@/lib/axios';
import { headerConfig } from '@/lib/headerConfig';
import { formatLocalTime } from '@/lib/formatlocaltime';
import { bindingState } from '@/lib/bindingState';
import Sidebar from '@/components/common/SidebarAdmin';
import SidebarReceptionist from '@/components/Common/SidebarReceptionist';


function ContainerEditBooking() {
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dataUser, setDataUser] = useState();
  const [dataUpdate, setDataUpdate] = useState({
    status_pemesanan: 'default',
    id_user: 'default',
  });

  const router = useRouter();
  const { id } = router.query;

  const [dataLogin, setDataLogin] = useState({});
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
            res ? setData(res.data.pemesanan) : alert('Data tidak ditemukan!');
          })
          .catch((err) => {
            alert('Data tidak ditemukan!');
            console.log(err);
          });
      };

      const getDataById = async () => {
        await axios
          .get(`/detail_pemesanan/${id}`, headerConfig())
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


      const getDataUser = async () => {
        await axios
          .get('/user', headerConfig())
          .then((res) => {
            if (res) {
              setDataUser(res.data.data);
            } else {
              alert('Data tidak ditemukan!');
            }
          })
          .catch((err) => {
            alert('Data tidak ditemukan!');
            console.log(err);
          });
      };

      Promise.all([getData(), getDataById(), getDataUser()]);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = { ...dataUpdate };
    const token = localStorage.getItem('token');

    await axios
      .put(`/pemesanan/${id}`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res) {
          alert('Berhasil mengubah data pemesanan!');
          setTimeout(() => {
            if (user?.role === 'admin') {
              router.push('/admin/dashboard');
            } else {
              router.push('/receptionist/dashboard');
            }
          }, 1800);
        } else {
          alert('Gagal mengubah data pemesanan!');
        }
      })
      .catch((err) => {
        // alert('Gagal mengubah data pemesanan!');
        console.log(err);
      });
  };
  console.log(data)

  return (
    <>
      <Head>
        <title>Ubah Pemesanan - Wikusama Hotel</title>
      </Head>

      {dataLogin?.role == 'admin' && <Sidebar />}
      {dataLogin?.role == 'resepsionis' && <SidebarReceptionist />}

      <main className="bg-white md:ml-64 min-h-screen">
        <section className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-10 pt-10">
              <h2 className="text-2xl font-bold text-primary capitalize">
                Ubah Pemesanan
              </h2>
            </div>

            <div className="w-full p-10">
              <div className="w-full">
                <div className="border-gray-300 bg-white border-solid border-2 rounded-lg px-5">
                  <div className="mt-3">
                    <h1 className="text-xl font-bold text-primary border-b-2 border-solid border-gray-300 pb-3">
                      Rincian Pesanan
                    </h1>

                    <div className="w-full lg:flex justify-between gap-5 py-5">
                      <div className="w-full">
                        <h2 className="mb-2 text-lg font-medium text-gray-500">
                          Nomor Pemesanan
                        </h2>

                        <input
                          disabled
                          className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                          type="text"
                          value={data?.nomor_pemesan || 'Tidak Diketahui'}
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-between gap-5 pb-5">
                      <div className="w-full">
                        <h2 className="mb-2 text-lg font-medium text-gray-500">
                          Nama Tipe Kamar
                        </h2>

                        <input
                          disabled
                          className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                          type="text"
                          value={
                            data?.tipe_kamar?.nama_tipe_kamar ||
                            'Tidak Diketahui'
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-between gap-5 pb-5">
                      <div className="w-full">
                        <h2 className="mb-2 text-lg font-medium text-gray-500">
                          Nama Pemesan
                        </h2>

                        <input
                          disabled
                          className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                          type="text"
                          value={data?.nama_pemesan || 'Tidak Diketahui'}
                        />
                      </div>

                      <div className="w-full">
                        <h2 className="mb-2 text-lg font-medium text-gray-500">
                          Email Pemesan
                        </h2>

                        <input
                          disabled
                          className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                          type="email"
                          value={data?.email_pemesan || 'Tidak Diketahui'}
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-between gap-5 pb-5">
                      <div className="w-full">
                        <h2 className="mb-2 text-lg font-medium text-gray-500">
                          Status Pemesanan
                        </h2>

                        <input
                          disabled
                          className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                          type="text"
                          value={
                            data?.status_pemesanan === 'check_in'
                              ? 'Check-in'
                              : 'Check-out' || 'Tidak Diketahui'
                          }
                        />
                      </div>

                      <div className="w-full">
                        <h2 className="mb-2 text-lg font-medium text-gray-500">
                          Petugas Pemesanan
                        </h2>

                        <input
                          disabled
                          className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-primary/50 sm:text-sm"
                          type="email"
                          value={data?.user?.nama_user || 'Tidak Diketahui'}
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-between gap-5 pb-5">
                      <div className="w-full">
                        <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                          Tgl Pemesanan
                        </h2>

                        <input
                          type="text"
                          disabled
                          className="w-full rounded-lg "
                          value={
                            formatLocalTime(data?.tgl_pemesanan) ||
                            'Tidak Diketahui'
                          }
                        />
                      </div>

                      <div className="w-full">
                        <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                          Tgl Check In
                        </h2>

                        <input
                          type="text"
                          disabled
                          className="w-full rounded-lg "
                          value={
                            formatLocalTime(data?.tgl_check_in) ||
                            'Tidak Diketahui'
                          }
                        />
                      </div>

                      <div className="w-full">
                        <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                          Tgl Check Out
                        </h2>

                        <input
                          type="text"
                          disabled
                          className="w-full rounded-lg "
                          value={
                            formatLocalTime(data?.tgl_check_out) ||
                            'Tidak Diketahui'
                          }
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 my-5">
                        <thead className="text-xs text-blue-500 uppercase bg-primary">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              No Kamar
                            </th>

                            <th scope="col" className="px-6 py-3">
                              Nama Tipe Kamar
                            </th>

                            <th scope="col" className="px-6 py-3">
                              Tgl Check In
                            </th>

                            <th scope="col" className="px-6 py-3">
                              Tgl Check Out
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {!dataRoom?.length ? (
                            <tr>
                              <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                  <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                    this text will not displayed
                                  </div>
                                </div>
                              </td>

                              <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                  <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                    this text will not displayed
                                  </div>
                                </div>
                              </td>

                              <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                  <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                    this text will not displayed
                                  </div>
                                </div>
                              </td>

                              <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                <div className="flex items-center select-none">
                                  <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                    this text will not displayed
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            dataRoom?.map((val, index) => (
                              <tr key={index} className="bg-gray-500">
                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                  <div className="flex items-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {val.kamar?.nomor_kamar}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                  <div className="flex items-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {data?.tipe_kamar?.nama_tipe_kamar}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                  <div className="flex items-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {formatLocalTime(data?.tgl_check_in)}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                  <div className="flex items-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {formatLocalTime(data?.tgl_check_out)}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="w-full mt-3 gap-5 pb-5">
                        <h1 className="text-xl font-bold text-blue border-b-2 border-solid border-gray-300 pb-3">
                          Ubah Data Pemesanan
                        </h1>
                      </div>

                      <div className="w-full flex justify-between gap-5 pb-5">
                        <div className="w-full">
                          <h2 className="mb-2 text-lg font-medium text-gray-500">
                            Status Pemesanan
                          </h2>

                          <select
                            name="status_pemesanan"
                            id="status_pemesanan"
                            value={dataUpdate?.status_pemesanan}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            required
                            onChange={(e) =>
                              bindingState(e, setDataUpdate, 'status_pemesanan')
                            }
                          >
                            <option value="default" selected disabled>
                              Pilih Status
                            </option>
                            <option value="check_in">Check-in</option>
                            <option value="check_out">Check-out</option>
                          </select>
                        </div>

                        <div className="w-full">
                          <h2 className="mb-2 text-lg font-medium text-gray-500">
                            Petugas Pemesanan
                          </h2>

                          <select
                            name="id_user"
                            id="id_user"
                            value={dataUpdate.id_user}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            required
                            onChange={(e) =>
                              bindingState(e, setDataUpdate, 'id_user')
                            }
                          >
                            <option value="default" selected disabled>
                              Pilih Petugas
                            </option>
                            {dataUser?.map((val, index) => (
                              <option value={val.id_user} key={index}>
                                {`ID-${val.id_user} => ${val.nama_user}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-end justify-end gap-5 pb-5">
                        <button
                          type="submit"
                          className="bg-primary hover:bg-primarydark rounded-lg text-blue-500 font-segoe font-normal text-base leading-6 px-3 py-2 transition duration-300 ease-in-out"
                        >
                          Simpan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContainerEditBooking;
