// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Box
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import MemoryIcon from "@mui/icons-material/Memory";
// import LaptopIcon from "@mui/icons-material/Laptop";

// import {
//   useLocation,
//   useNavigate
// } from "react-router-dom";

// import {
//   useDispatch
// } from "react-redux";

// import {
//   logout
// } from "../../store/slices/authSlice";

// const items = [
//   {
//     label: "Dashboard",
//     path: "/dashboard",
//     icon: <DashboardIcon />
//   },

//   {
//     label: "Components",
//     path: "/components",
//     icon: <MemoryIcon />
//   },

//   {
//     label: "Configurations",
//     path: "/configurations",
//     icon: <LaptopIcon />
//   }
// ];

// export default function Sidebar({
//   mobile = false,
//   open = false,
//   onClose
// }) {

//   const location =
//     useLocation();

//   const navigate =
//     useNavigate();

//   const dispatch =
//     useDispatch();

//   const content = (
//     <Box
//       sx={{
//         width: 240,
//         pt: mobile ? 8 : 0
//       }}
//     >

//       <List>

//         {items.map((item) => (

//           <ListItemButton
//             key={item.path}
//             selected={
//               location.pathname.startsWith(
//                 item.path
//               )
//             }
//             onClick={() => {

//               navigate(item.path);

//               onClose?.();

//             }}
//           >

//             <ListItemIcon>
//               {item.icon}
//             </ListItemIcon>

//             <ListItemText
//               primary={item.label}
//             />

//           </ListItemButton>

//         ))}

//         <ListItemButton
//           onClick={() =>
//             dispatch(logout())
//           }
//         >

//           <ListItemText
//             primary="Logout"
//           />

//         </ListItemButton>

//       </List>

//     </Box>
//   );

//   if (mobile) {

//     return (
//       <Drawer
//         open={open}
//         onClose={onClose}
//       >
//         {content}
//       </Drawer>
//     );

//   }

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: 240,
//           boxSizing: "border-box",
//           pt: "64px"
//         }
//       }}
//     >
//       {content}
//     </Drawer>
//   );
// }

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MemoryIcon from "@mui/icons-material/Memory";
import LaptopIcon from "@mui/icons-material/Laptop";
import LogoutIcon from "@mui/icons-material/Logout";
import ComputerIcon from "@mui/icons-material/Computer";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  logout,
} from "../../store/slices/authSlice";

const items = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Components",
    path: "/components",
    icon: <MemoryIcon />,
  },
  {
    label: "Configurations",
    path: "/configurations",
    icon: <LaptopIcon />,
  },
];

export default function Sidebar({
  mobile = false,
  open = false,
  onClose,
}) {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const handleNavigation = (
    path
  ) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose?.();
  };

  const content = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
        color: "#fff",
        pt: mobile ? 2 : 0,
      }}
    >
      {/* Brand */}

      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #2563eb, #7c3aed)",
            boxShadow:
              "0 8px 20px rgba(37, 99, 235, 0.3)",
          }}
        >
          <ComputerIcon />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Laptop Pricing
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color:
                "rgba(255,255,255,0.55)",
              mt: 0.3,
            }}
          >
            Management System
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          borderColor:
            "rgba(255,255,255,0.08)",
        }}
      />

      {/* Navigation */}

      <Box
        sx={{
          px: 1.5,
          py: 2,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform:
              "uppercase",
            color:
              "rgba(255,255,255,0.4)",
          }}
        >
          Main Menu
        </Typography>

        <List
          disablePadding
        >
          {items.map(
            (item) => {
              const selected =
                location.pathname ===
                  item.path ||
                location.pathname.startsWith(
                  `${item.path}/`
                );

              return (
                <ListItemButton
                  key={item.path}
                  selected={selected}
                  onClick={() =>
                    handleNavigation(
                      item.path
                    )
                  }
                  sx={{
                    minHeight: 48,
                    mb: 0.7,
                    px: 1.5,
                    borderRadius: 2,
                    color: selected
                      ? "#fff"
                      : "rgba(255,255,255,0.65)",
                    position:
                      "relative",

                    "& .MuiListItemIcon-root":
                      {
                        minWidth: 40,
                        color: selected
                          ? "#fff"
                          : "rgba(255,255,255,0.5)",
                      },

                    "& .MuiListItemText-primary":
                      {
                        fontSize: 14,
                        fontWeight:
                          selected
                            ? 700
                            : 500,
                      },

                    "&:hover": {
                      backgroundColor:
                        "rgba(255,255,255,0.07)",
                      color: "#fff",

                      "& .MuiListItemIcon-root":
                        {
                          color: "#fff",
                        },
                    },

                    "&.Mui-selected": {
                      background:
                        "linear-gradient(90deg, rgba(37,99,235,0.95), rgba(124,58,237,0.9))",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,0.22)",
                    },

                    "&.Mui-selected:hover":
                      {
                        background:
                          "linear-gradient(90deg, rgba(37,99,235,1), rgba(124,58,237,1))",
                      },
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      item.label
                    }
                  />
                </ListItemButton>
              );
            }
          )}
        </List>
      </Box>

      {/* Logout */}

      <Box
        sx={{
          px: 1.5,
          pb: 2,
        }}
      >
        <Divider
          sx={{
            mb: 1.5,
            borderColor:
              "rgba(255,255,255,0.08)",
          }}
        />

        <ListItemButton
          onClick={
            handleLogout
          }
          sx={{
            minHeight: 48,
            px: 1.5,
            borderRadius: 2,
            color:
              "rgba(255,255,255,0.65)",

            "& .MuiListItemIcon-root":
              {
                minWidth: 40,
                color:
                  "rgba(255,255,255,0.5)",
              },

            "& .MuiListItemText-primary":
              {
                fontSize: 14,
                fontWeight: 500,
              },

            "&:hover": {
              backgroundColor:
                "rgba(220,38,38,0.12)",
              color: "#f87171",

              "& .MuiListItemIcon-root":
                {
                  color: "#f87171",
                },
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  if (mobile) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper":
            {
              width: 260,
              border: "none",
              boxShadow:
                "8px 0 30px rgba(0,0,0,0.2)",
            },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,

        "& .MuiDrawer-paper":
          {
            width: 260,
            boxSizing:
              "border-box",
            border: "none",
            boxShadow:
              "4px 0 20px rgba(15,23,42,0.08)",
            top: 0,
          },
      }}
    >
      {content}
    </Drawer>
  );
}