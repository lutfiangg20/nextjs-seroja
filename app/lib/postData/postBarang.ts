const postBarang = async (formData: any, token: string, setFormData: any) => {
  await fetch("/api/barang", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(formData),
  })
    .then(() => {
      setFormData(formData);
    })
    .catch((err) => console.log(err));
};

export default postBarang;
