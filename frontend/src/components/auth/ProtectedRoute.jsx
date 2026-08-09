import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const location = useLocation();

  // Redux authentication state
  
  const { isAuthenticated } =
    useSelector(
      (state) => state.auth
    );


  // JWT token saved after backend login

  const token =
    localStorage.getItem("token");


  // User saved after backend login
  
  const user =
    localStorage.getItem("user");

  const hasStoredSession =
    Boolean(token && user);

  const authenticated =
    isAuthenticated ||
    hasStoredSession;

  
  // User is NOT authenticated

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname +
            location.search,
        }}
      />
    );
  }

  // User is authenticated
  
  return <Outlet />;
}