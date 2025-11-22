import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "./ConfiguracionTaller.css";

import Servicios from "./Servicios";
import Usuarios from "./Usuarios"; 
import Estaciones from "./Estaciones";


export default function Configuracion() {
  const [tab, setTab] = useState("servicios");

  return (
    <>
      <Header />
      <Sidebar />

      {/* Contenedor principal: espacio para sidebar y header */}
      <div className="main-content">
        {/* Título */}
        <h1 className="config-taller-title">Configuración del Taller</h1>

        {/* Pestañas */}
        <div className="tabs">
          <button
            onClick={() => setTab("servicios")}
            className={tab === "servicios" ? "active" : ""}
          >
            Servicios
          </button>

          <button
            onClick={() => setTab("usuarios")}
            className={tab === "usuarios" ? "active" : ""}
          >
            Usuarios
          </button>

          <button
            onClick={() => setTab("estaciones")}
            className={tab === "estaciones" ? "active" : ""}
          >
            Estaciones
          </button>
        </div>

        <hr className="tabs-separator" />

        {/* Contenido de la pestaña */}
        <div className="tab-content">
          {tab === "servicios" && <Servicios />}
          {tab === "usuarios" && <Usuarios />}
          {tab === "estaciones" && <Estaciones />}
        </div>

        <Footer />
      </div>
    </>
  );
}
