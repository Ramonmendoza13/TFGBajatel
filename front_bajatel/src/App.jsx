import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServiciosPage from "./pages/ServiciosPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import ZonaPrivadaPage from "./pages/ZonaPrivadaPage";
import EditarPerfilPage from "./pages/EditarPerfilPage";
import AdminPage from "./pages/AdminPage";
import AnadirOpcionFibraPage from "./pages/AnadirOpcionFibraPage";
import EditarOpcionFibra from "./pages/EditarOpcionFibraPage";
import AnadirOpcionMovilPage from "./pages/AnadirOpcionMovilPage";
import EditarOpcionMovilPage from "./pages/EditarOpcionMovilPage";
import AnadirOpcionTvPage from "./pages/AnadirOpcionTvPage";
import EditarOpcionTvPage from "./pages/EditarOpcionTvPage";



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
        path="/admin"
        element={
          <Layout>
            <AdminPage />
          </Layout>
        }
      />
      <Route
        path="/anadir-opcion-fibra"
        element={
          <Layout>
            <AnadirOpcionFibraPage />
          </Layout>
        }
      />
      <Route
        path="/editar-opcion-fibra/:id"
        element={
          <Layout>
            <EditarOpcionFibra />
          </Layout>
        }
      />
      <Route
        path="/anadir-opcion-movil"
        element={
          <Layout>
            <AnadirOpcionMovilPage />
          </Layout>
        }
      />
      <Route
        path="/editar-opcion-movil/:id"
        element={
          <Layout>
            <EditarOpcionMovilPage />
          </Layout>
        }
      />
      <Route
        path="/anadir-opcion-tv"
        element={
          <Layout>
            <AnadirOpcionTvPage />
          </Layout>
        }
      />
      <Route
        path="/editar-opcion-tv/:id"
        element={
          <Layout>
            <EditarOpcionTvPage />
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
