import React, { useState, useEffect } from "react";

const ServiciosForm = ({ onSubmit, onUpdate, editando }) => {
  const [form, setForm] = useState({ nombre: "", precio: "" });

  useEffect(() => {
    if (editando) setForm(editando);
  }, [editando]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editando) {
      onUpdate(editando._id, form);
    } else {
      onSubmit(form);
    }

    setForm({ nombre: "", precio: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>{editando ? "Editar Servicio" : "Nuevo Servicio"}</h3>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <input
        name="precio"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
      />

      <button type="submit">{editando ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default ServiciosForm;
