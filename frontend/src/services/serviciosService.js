const API_URL = "http://localhost:3000/api/servicios";

export const obtenerServicios = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener servicios");
  return res.json();
};

export const crearServicio = async (servicioData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servicioData)
  });
  if (!res.ok) throw new Error("Error al crear servicio");
  return res.json();
};

export const actualizarServicio = async (id, datos) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error("Error al actualizar servicio");
  return res.json();
};

export const eliminarServicio = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar servicio");
  return res.json();
};
