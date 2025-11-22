const API_URL = "http://localhost:3000/api";

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
