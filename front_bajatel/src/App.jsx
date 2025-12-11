import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServiciosPage from "./pages/ServiciosPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import ZonaPrivadaPage from "./pages/ZonaPrivadaPage";
import EditarPerfilPage from "./pages/EditarPerfilPage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/servicios"
        element={
          <Layout>
            <ServiciosPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/zona-privada"
        element={
          <Layout>
            <ZonaPrivadaPage />
          </Layout>
        }
      />
      <Route
        path="/editar-perfil"
        element={
          <Layout>
            <EditarPerfilPage />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
