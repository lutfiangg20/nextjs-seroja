const getKategori = async (setKategori: any, token: string) => {
  await fetch("/api/kategori", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setKategori(data.data);
    });
};

export default getKategori;
