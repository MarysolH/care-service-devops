import React from "react";

const ServiciosList = ({ servicios, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Servicios</h3>

      {servicios.map((s) => (
        <div key={s._id} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
          <span>{s.nombre}</span>
          <span>${s.precio}</span>

          <button onClick={() => onEdit(s)}>Editar</button>
          <button onClick={() => onDelete(s._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default ServiciosList;
