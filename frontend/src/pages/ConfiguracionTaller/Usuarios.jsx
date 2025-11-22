import React, { useEffect, useState } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../../services/usuariosService";
import "./ConfiguracionTaller.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [rol, setRol] = useState("mecanico");

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [toast, setToast] = useState(null);
  const [confirmEliminar, setConfirmEliminar] = useState(null);

  useEffect(() => { cargarUsuarios(); }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      mostrarToast("Error al cargar usuarios");
    }
  };

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2500);
  };

  const handleCrear = async () => {
    if (!nombre || !apellido || !usuario) return;
    try {
      await crearUsuario({ nombre, apellido, usuario, rol });
      setNombre(""); setApellido(""); setUsuario(""); setRol("mecanico");
      cargarUsuarios();
      mostrarToast("Usuario creado correctamente");
    } catch (error) {
      mostrarToast("Error al crear usuario");
    }
  };

  const handleEditar = (u) => {
    setNombre(u.nombre);
    setApellido(u.apellido);
    setUsuario(u.usuario);
    setRol(u.rol);
    setEditando(true);
    setIdEditando(u._id);
  };

  const handleActualizar = async () => {
    if (!nombre || !apellido || !usuario) return;
    try {
      await actualizarUsuario(idEditando, { nombre, apellido, usuario, rol });
      setNombre(""); setApellido(""); setUsuario(""); setRol("mecanico");
      setEditando(false);
      setIdEditando(null);
      cargarUsuarios();
      mostrarToast("Usuario modificado correctamente");
    } catch (error) {
      mostrarToast("Error al actualizar usuario");
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarUsuario(id);
      setConfirmEliminar(null);
      cargarUsuarios();
      mostrarToast("Usuario eliminado correctamente");
    } catch (error) {
      mostrarToast("Error al eliminar usuario");
    }
  };

  return (
    <div className="config-section">
      <h2>Usuarios del Taller</h2>

      {/* FORMULARIO */}
      <div className="nuevo-servicio-form">
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
        <input placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <select value={rol} onChange={e => setRol(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="mecanico">Mecánico</option>
        </select>

        {editando ? (
          <button className="btn-guardar" onClick={handleActualizar}>Guardar cambios</button>
        ) : (
          <button className="btn-agregar" onClick={handleCrear}>Agregar usuario</button>
        )}
      </div>

      {/* LISTADO */}
      <div className="tabla-servicios-container">
        <table className="tabla-servicios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th style={{ width: "140px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#777" }}>No hay usuarios cargados.</td>
              </tr>
            ) : (
              usuarios.map(u => (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.usuario}</td>
                  <td>{u.rol}</td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEditar(u)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => setConfirmEliminar(u._id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* TOAST */}
      {toast && <div className="toast-mensaje">{toast}</div>}

      {/* CONFIRMAR ELIMINAR */}
      {confirmEliminar && (
        <div className="modal-overlay">
          <div className="modal-servicio">
            <p>¿Seguro que querés eliminar este usuario?</p>
            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={() => setConfirmEliminar(null)}>Cancelar</button>
              <button className="btn-eliminar" onClick={() => handleEliminar(confirmEliminar)}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
