import React, { useEffect, useState } from "react";
import { obtenerUsuarios } from "../../services/usuariosService";
import { obtenerEstaciones, asignarMecanico } from "../../services/estacionesService";
import "./ConfiguracionTaller.css";

export default function Estaciones() {
  const [mecanicos, setMecanicos] = useState([]);
  const [asignaciones, setAsignaciones] = useState({});
  const [toast, setToast] = useState(null);

  const estaciones = [1, 2, 3, 4, 5]; // Siempre visibles

  useEffect(() => {
    const cargarDatos = async () => {
      const usuarios = await obtenerUsuarios();
      setMecanicos(usuarios.filter(u => u.rol === "mecanico"));

      const ests = await obtenerEstaciones();
      const asigns = ests.reduce((acc, e) => ({ ...acc, [e.id]: e.mecanicoId }), {});
      setAsignaciones(asigns);
    };
    cargarDatos();
  }, []);

  const handleAsignar = async (estacion, mecanicoId) => {
    await asignarMecanico(estacion, mecanicoId);
    setAsignaciones(prev => ({ ...prev, [estacion]: mecanicoId }));
    const mecanico = mecanicos.find(m => m._id === mecanicoId);
    mostrarToast(`Mecánico ${mecanico?.nombre} asignado a estación ${estacion}`);
  };

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="config-section">
      <h2>Estaciones del Taller</h2>
      
      <div className="tabla-servicios-container">
        <table className="tabla-servicios">
          <thead>
            <tr>
              <th>Estación</th>
              <th>Mecánico asignado</th>
            </tr>
          </thead>
          <tbody>
            {estaciones.map((est) => (
              <tr key={est}>
                <td>Estación {est}</td>
                <td>
                  <select
                    value={asignaciones[est] || ""}
                    onChange={(e) => handleAsignar(est, e.target.value)}
                  >
                    <option value="">-- Seleccionar mecánico --</option>
                    {mecanicos.map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.nombre} {m.apellido}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <div className="toast-mensaje">{toast}</div>}
    </div>
  );
}
