const API_URL = "http://localhost:3000/api/usuarios"; 

export const obtenerUsuarios = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

export const crearUsuario = async (usuarioData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioData),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
};

export const actualizarUsuario = async (id, datos) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
};

export const eliminarUsuario = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar usuario");
  return res.json();
};
