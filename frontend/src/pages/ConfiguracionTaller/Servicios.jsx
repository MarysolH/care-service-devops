import React, { useEffect, useState } from "react";
import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from "../../services/serviciosService";
import "./ConfiguracionTaller.css"; 

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [toast, setToast] = useState(null); // mensaje flotante
  const [confirmEliminar, setConfirmEliminar] = useState(null); // id a eliminar

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const data = await obtenerServicios();
    setServicios(data);
  };

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2500); // desaparece a los 2.5s
  };

  const handleCrear = async () => {
    if (!nombre || !precio) return;
    await crearServicio({ nombre, precio: Number(precio) });
    setNombre("");
    setPrecio("");
    cargarServicios();
    mostrarToast("Servicio creado correctamente");
  };

  const handleEditar = (servicio) => {
    setNombre(servicio.nombre);
    setPrecio(servicio.precio);
    setEditando(true);
    setIdEditando(servicio._id);
  };

  const handleActualizar = async () => {
    if (!nombre || !precio) return;
    await actualizarServicio(idEditando, { nombre, precio: Number(precio) });
    setNombre("");
    setPrecio("");
    setEditando(false);
    setIdEditando(null);
    cargarServicios();
    mostrarToast("Servicio modificado correctamente");
  };

  const handleEliminar = async (id) => {
    await eliminarServicio(id);
    setConfirmEliminar(null);
    cargarServicios();
    mostrarToast("Servicio eliminado correctamente");
  };

  return (
    <div className="config-section">
      <h2>Servicios del Taller</h2>

      {/* FORMULARIO */}
      <div className="nuevo-servicio-form">
        <input
          type="text"
          placeholder="Nombre del servicio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        {editando ? (
          <button className="btn-guardar" onClick={handleActualizar}>
            Guardar cambios
          </button>
        ) : (
          <button className="btn-agregar" onClick={handleCrear}>
            Agregar servicio
          </button>
        )}
      </div>

      {/* LISTADO DE SERVICIOS */}
      <div className="tabla-servicios-container">
        <table className="tabla-servicios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio ($)</th>
              <th style={{ width: "140px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "#777" }}>
                  No hay servicios cargados.
                </td>
              </tr>
            )}
            {servicios.map((s) => (
              <tr key={s._id}>
                <td>{s.nombre}</td>
                <td>{s.precio}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(s)}>
                    Editar
                  </button>
                  <button className="btn-eliminar" onClick={() => setConfirmEliminar(s._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- TOAST/MENSAJE --- */}
      {toast && <div className="toast-mensaje">{toast}</div>}

      {/* --- CONFIRMAR ELIMINAR --- */}
      {confirmEliminar && (
        <div className="modal-overlay">
          <div className="modal-servicio">
            <p>¿Seguro que querés eliminar este servicio?</p>
            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={() => setConfirmEliminar(null)}>
                Cancelar
              </button>
              <button className="btn-eliminar" onClick={() => handleEliminar(confirmEliminar)}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
