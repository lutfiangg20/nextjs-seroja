"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "universal-cookie";
import { Box, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import getBarang from "@/app/lib/getData/getBarang";
import getKategori from "@/app/lib/getData/getKategori";
import postBarang from "@/app/lib/postData/postBarang";
import deleteBarang from "@/app/lib/deleteData/deleteBarang";
import updateBarang from "@/app/lib/updateData/updateBarang";

const Barang = () => {
  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori: "",
    stok: 0,
    harga: "",
  });
  const [open, setOpen] = useState(false);
  let cookie = new Cookies();
  const token = cookie.get("token");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postBarang(formData, getBarang(setBarang, token), token, setFormData);
    getBarang(setBarang, token);
  };

  const handleDelete = async (nama_barang) => {
    /*  const newBarang = barang.filter((item) => item.id !== id);
    setBarang(newBarang); */
    deleteBarang(getBarang, setBarang, token, nama_barang);
  };

  useEffect(() => {
    getBarang(setBarang, token);
    getKategori(setKategori, token);
  }, []);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR", // You can change this to your desired currency code
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "nama_barang",
        header: "Nama Barang",
      },
      {
        accessorKey: "kategori",
        header: "kategori",
      },
      {
        accessorKey: "stok",
        header: "Stok",
      },
      {
        accessorKey: "harga",
        header: "Harga",
        //format rupiah
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "_id",
        header: "Action",
        Cell: ({ cell }) => (
          <span className="flex flex-row gap-2">
            <div className="">
              <button
                className="btn btn-danger "
                onClick={() => handleDelete(cell.row.original.nama_barang)}
              >
                <Tooltip title="Hapus" placement="top">
                  <GridDeleteIcon />
                </Tooltip>
              </button>
            </div>
            <div className="">
              <button
                className="btn btn-warning "
                onClick={() => {
                  setEditBarang({
                    nama_barang: cell.row.original.nama_barang,
                    kategori: cell.row.original.kategori,
                    stok: cell.row.original.stok,
                    harga: cell.row.original.harga,
                  });
                  console.log(editBarang);
                  console.log();
                  handleOpen();
                }}
              >
                <Tooltip title="Edit" placement="top">
                  <EditIcon />
                </Tooltip>
              </button>
            </div>
          </span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: barang, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    muiTableBodyCellProps: () => ({
      sx: {
        textTransform: "capitalize",
      },
    }),
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editBarang, setEditBarang] = useState({
    id: "",
    nama_barang: "",
    kategori: "",
    stok: 0,
    harga: "",
  });

  const handleInputUpdate = (e) => {
    setEditBarang({ ...editBarang, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(editBarang);
    updateBarang(editBarang, token, getBarang, setBarang);
    handleClose();
  };

  return (
    <>
      <div>
        <div className="card" style={{}}>
          <div className="my-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row gap-2">
                <div className="">
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Nama Barang"
                    id="nama_barang"
                    name="nama_barang"
                    aria-describedby="emailHelp"
                    onChange={handleInput}
                    value={formData.nama_barang}
                  />
                </div>
                <div className="">
                  <select
                    className="select select-bordered"
                    aria-label="Default select example"
                    placeholder="Kategori"
                    id="kategori"
                    name="kategori"
                    onChange={handleInput}
                    value={formData.kategori}
                    /*  key={formData.kategori} */
                  >
                    <option value="" disabled selected>
                      Pilih Kategori
                    </option>
                    {kategori.map((item) => (
                      <option key={item.id} className="text-capitalize">
                        {item.nama_kategori}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <input
                    type="number"
                    className="input input-bordered "
                    id="stok"
                    name="stok"
                    placeholder="Stok"
                    onChange={handleInput}
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    className="input input-bordered"
                    id="harga"
                    name="harga"
                    placeholder="Harga"
                    onChange={handleInput}
                    value={formData.harga}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success float-end text-white"
                >
                  <i className="fa-solid fa-circle-plus" /> Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card" style={{}}>
          <MaterialReactTable table={table} />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card" style={{}}>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="flex flex-row gap-2">
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="input input-bordered"
                      placeholder="Nama Barang"
                      id="nama_barang"
                      name="nama_barang"
                      aria-describedby="emailHelp"
                      onChange={handleInputUpdate}
                      value={editBarang.nama_barang}
                    />
                  </div>
                  <div className="col-sm-2">
                    <select
                      className="select"
                      aria-label="Default select example"
                      placeholder="Kategori"
                      id="kategori"
                      name="kategori"
                      onChange={handleInputUpdate}
                      value={editBarang.kategori}
                      /*  key={formData.kategori} */
                    >
                      <option value="" disabled selected>
                        Pilih Kategori
                      </option>
                      {kategori.map((item) => (
                        <option key={item.id} className="text-capitalize">
                          {item.nama_kategori}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="number"
                      className="input"
                      id="stok"
                      name="stok"
                      placeholder="Stok"
                      onChange={handleInputUpdate}
                      value={editBarang.stok}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="number"
                      className="input"
                      id="harga"
                      name="harga"
                      placeholder="Harga"
                      onChange={handleInputUpdate}
                      value={editBarang.harga}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success float-end col-sm-2"
                  >
                    <i className="fa-solid fa-circle-plus" /> Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Barang;
