// import {
//   Outlet
// } from "react-router-dom";

// import {
//   Box,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";

// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// export default function AppLayout() {

//   const theme = useTheme();

//   const mobile = useMediaQuery(
//     theme.breakpoints.down("md")
//   );

//   return (
//     <Box sx={{ minHeight: "100vh" }}>

//       <Navbar />

//       {!mobile && <Sidebar />}

//       <Box
//         component="main"
//         sx={{
//           ml: {
//             xs: 0,
//             md: "240px"
//           },

//           pt: "64px"
//         }}
//       >
//         <Outlet />
//       </Box>

//     </Box>
//   );
// }

import {
  Outlet,
} from "react-router-dom";

import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const theme =
    useTheme();

  const mobile =
    useMediaQuery(
      theme.breakpoints.down(
        "md"
      )
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor:
          "#f6f8fc",
      }}
    >
      <Navbar />

      {!mobile && <Sidebar />}

      <Box
        component="main"
        sx={{
          minHeight: "100vh",

          ml: {
            xs: 0,
            md: "260px",
          },

          pt: {
            xs: "72px",
            md: "72px",
          },

          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
          },

          pb: 5,

          transition:
            "margin-left 0.2s ease",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1600px",
            mx: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}