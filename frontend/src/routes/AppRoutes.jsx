import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import ProtectedRoute
  from "../components/auth/ProtectedRoute";

import AppLayout
  from "../components/layout/AppLayout";

import LoginPage
  from "../pages/auth/LoginPage";

import DashboardPage
  from "../pages/dashboard/DashboardPage";

import ComponentsPage
  from "../pages/components/ComponentsPage";

import CreateComponentPage
  from "../pages/components/CreateComponentPage";

import EditComponentPage
  from "../pages/components/EditComponentPage";

import ConfigurationsPage
  from "../pages/configurations/ConfigurationsPage";

import CreateConfigurationPage
  from "../pages/configurations/CreateConfigurationPage";

import ConfigurationDetailsPage
  from "../pages/configurations/ConfigurationDetailsPage";

export default function AppRoutes() {

  return (
    <Routes>

      {/* Public */}

      <Route
        path="/login"
        element={
          <LoginPage />
        }
      />

      {/* Protected */}

      <Route
        element={
          <ProtectedRoute />
        }
      >

        <Route
          element={
            <AppLayout />
          }
        >

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <DashboardPage />
            }
          />

          <Route
            path="/components"
            element={
              <ComponentsPage />
            }
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