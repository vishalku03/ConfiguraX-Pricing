import { Outlet } from "react-router-dom";

import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const theme = useTheme();

  const mobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
      }}
    >
      <Navbar />

      {!mobile && <Sidebar />}

      <Box
        component="main"
        sx={{
          ml: {
            xs: 0,
            md: "260px",
          },

          pt: "72px",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
          },

          pb: 5,

          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: 1600,
            mx: "auto",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}