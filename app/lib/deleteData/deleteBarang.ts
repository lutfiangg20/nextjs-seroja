const deleteBarang = async (
  getBarang: any,
  setBarang: any,
  token: string,
  nama_barang: string
) => {
  await fetch(`/api/barang/${nama_barang}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(() => {
    getBarang(setBarang, token);
  });
};

export default deleteBarang;
