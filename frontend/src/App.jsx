import { Routes, Route } from "react-router-dom";

import Configuracion from "./pages/ConfiguracionTaller/Configuracion";

// import Estaciones from "./pages/ConfiguracionTaller/Estaciones";

// import TestApi from "./pages/TestApi";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Configuracion />} />      
      <Route path="/configuracion" element={<Configuracion />} />      
      
      {/*vista de prueba */}
      {/* <Route path="/test" element={<TestApi />} /> */}
    </Routes>
  );
}

export default App;



