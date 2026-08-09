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

import { useDispatch } from "react-redux";

import { logout } from "../../store/slices/authSlice";

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
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const content = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        background:
          "linear-gradient(180deg,#0f172a 0%,#111827 100%)",
      }}
    >
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
            display: "grid",
            placeItems: "center",
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
            boxShadow:
              "0 8px 25px rgba(37,99,235,.3)",
          }}
        >
          <ComputerIcon />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            Laptop Pricing
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "rgba(255,255,255,.5)",
            }}
          >
            Management System
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)",
        }}
      />

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
            fontWeight: 800,
            letterSpacing: 1.2,
            color: "rgba(255,255,255,.38)",
          }}
        >
          MAIN MENU
        </Typography>

        <List disablePadding>
          {items.map((item) => {
            const selected =
              location.pathname === item.path ||
              location.pathname.startsWith(
                `${item.path}/`
              );

            return (
              <ListItemButton
                key={item.path}
                selected={selected}
                onClick={() => {
                  navigate(item.path);
                  onClose?.();
                }}
                sx={{
                  minHeight: 48,
                  mb: 0.7,
                  px: 1.5,
                  borderRadius: 2,
                  color: selected
                    ? "#fff"
                    : "rgba(255,255,255,.62)",

                  "& .MuiListItemIcon-root": {
                    minWidth: 40,
                    color: selected
                      ? "#fff"
                      : "rgba(255,255,255,.45)",
                  },

                  "& .MuiListItemText-primary": {
                    fontSize: 14,
                    fontWeight: selected
                      ? 700
                      : 500,
                  },

                  "&:hover": {
                    background:
                      "rgba(255,255,255,.07)",
                    color: "#fff",
                  },

                  "&.Mui-selected": {
                    background:
                      "linear-gradient(90deg,#2563eb,#4f46e5)",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box sx={{ px: 1.5, pb: 2 }}>
        <Divider
          sx={{
            mb: 1.5,
            borderColor:
              "rgba(255,255,255,.08)",
          }}
        />

        <ListItemButton
          onClick={() => {
            dispatch(logout());
            onClose?.();
          }}
          sx={{
            minHeight: 48,
            px: 1.5,
            borderRadius: 2,
            color: "rgba(255,255,255,.62)",

            "&:hover": {
              background:
                "rgba(220,38,38,.12)",
              color: "#f87171",
            },

            "& .MuiListItemIcon-root": {
              minWidth: 40,
              color: "inherit",
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
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
          "& .MuiDrawer-paper": {
            width: 260,
            border: "none",
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

        "& .MuiDrawer-paper": {
          width: 260,
          border: "none",
          boxSizing: "border-box",
          top: 0,
        },
      }}
    >
      {content}
    </Drawer>
  );
}