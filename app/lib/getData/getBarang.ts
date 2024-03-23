const getBarang = async (setBarang: any, token: string) => {
  await fetch("/api/barang", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setBarang(data.data);
    });
};

export default getBarang;
