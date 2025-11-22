import { useEffect, useState } from "react";
import { getTurnos, getUsuarios, getServicios } from "../services/api";

export default function TestApi() {
  const [turnos, setTurnos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    getTurnos().then(setTurnos);
    getUsuarios().then(setUsuarios);
    getServicios().then(setServicios);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Prueba API</h2>

      <h3>Turnos</h3>
      <pre>{JSON.stringify(turnos, null, 2)}</pre>

      <h3>Usuarios</h3>
      <pre>{JSON.stringify(usuarios, null, 2)}</pre>

      <h3>Servicios</h3>
      <pre>{JSON.stringify(servicios, null, 2)}</pre>
    </div>
  );
}
