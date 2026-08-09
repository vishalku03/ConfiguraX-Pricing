import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import ComponentsPage from "./pages/components/ComponentsPage";
import CreateComponentPage from "./pages/components/CreateComponentPage";
import EditComponentPage from "./pages/components/EditComponentPage";

import ConfigurationsPage from "./pages/configurations/ConfigurationsPage";
import CreateConfigurationPage from "./pages/configurations/CreateConfigurationPage";
import ConfigurationDetailsPage from "./pages/configurations/ConfigurationDetailsPage";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      
      <Route
        path="/login"
        element={<LoginPage />}
      />


      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          {/* Root */}
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          

          <Route
            path="/components"
            element={<ComponentsPage />}
          />

          <Route
            path="/components/new"
            element={
              <CreateComponentPage />
            }
          />

          <Route
            path="/components/:id/edit"
            element={
              <EditComponentPage />
            }
          />

          <Route
            path="/configurations"
            element={
              <ConfigurationsPage />
            }
          />

          <Route
            path="/configurations/new"
            element={
              <CreateConfigurationPage />
            }
          />

          <Route
            path="/configurations/:id"
            element={
              <ConfigurationDetailsPage />
            }
          />

        </Route>
      </Route>

      

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}