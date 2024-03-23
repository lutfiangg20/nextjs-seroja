const updateBarang = async (
  editBarang: any,
  token: string,
  getBarang: any,
  setBarang: any
) => {
  await fetch(`/api/barang/${editBarang.nama_barang}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(editBarang),
  })
    .then(() => {
      getBarang(setBarang);
    })
    .catch((err) => console.log(err));
};

export default updateBarang;
