// Mock inicial de estaciones
let estaciones = [
  { id: 1, mecanicoId: "" },
  { id: 2, mecanicoId: "" },
  { id: 3, mecanicoId: "" },
  { id: 4, mecanicoId: "" },
  { id: 5, mecanicoId: "" },
];

// Obtener estaciones
export const obtenerEstaciones = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...estaciones]), 200);
  });
};

// Asignar mecánico a estación
export const asignarMecanico = async (id, mecanicoId) => {
  estaciones = estaciones.map((e) =>
    e.id === id ? { ...e, mecanicoId } : e
  );
  return new Promise((resolve) => setTimeout(() => resolve(true), 200));
};
