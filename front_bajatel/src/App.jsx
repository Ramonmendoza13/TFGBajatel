import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import ServiciosPage from "./pages/ServiciosPage";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Ruta comodín */}
      </Routes>
    </div>
  );
};
export default App;