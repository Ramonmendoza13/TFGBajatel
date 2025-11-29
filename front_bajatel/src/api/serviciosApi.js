import axiosClient from "./axiosClient";

export const getServiciosDisponibles = async () => {
  const { data } = await axiosClient.get("/servicios/disponibles");
  return data;
};
