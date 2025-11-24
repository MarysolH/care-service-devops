const API_URL = "https://care-service-devops.onrender.com/api";

export const getTurnos = async () => {
  const res = await fetch(`${API_URL}/turnos`);
  return res.json();
};

export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
};

export const getServicios = async () => {
  const res = await fetch(`${API_URL}/servicios`);
  return res.json();
};
