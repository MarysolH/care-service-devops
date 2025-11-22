import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Agenda
            </Link>
          </li>

          <li>
            <Link
              to="/configuracion"
              className={location.pathname.startsWith("/configuracion") ? "active" : ""}
            >
              Configuración Taller
            </Link>
            <ul className="submenu">
              <li>
                <Link to="/configuracion/servicios"></Link>
              </li>
              <li>
                <Link to="/configuracion/usuarios"></Link>
              </li>
              <li>
                <Link to="/configuracion/estaciones"></Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
