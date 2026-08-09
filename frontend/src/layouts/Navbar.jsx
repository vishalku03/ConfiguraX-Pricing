import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { useState } from "react";

import Sidebar from "./Sidebar";

export default function Navbar() {
  const theme = useTheme();

  const mobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(14px)",
          color: "#0f172a",
          borderBottom: "1px solid #e5e7eb",
          zIndex: 1201,
        }}
      >
        <Toolbar
          sx={{
            minHeight: "72px !important",
            px: {
              xs: 2,
              md: 3,
            },
          }}
        >
          {mobile && (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                mr: 1,
                color: "#334155",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: {
                  xs: 17,
                  md: 19,
                },
                fontWeight: 800,
                letterSpacing: "-0.3px",
              }}
            >
              Laptop Pricing System
            </Typography>

            {!mobile && (
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#64748b",
                  mt: 0.2,
                }}
              >
                Configuration & Pricing Management
              </Typography>
            )}
          </Box>

          <IconButton
            sx={{
              mr: 1,
              color: "#64748b",
            }}
          >
            <NotificationsNoneIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              pl: 1.5,
              borderLeft: "1px solid #e5e7eb",
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                fontSize: 14,
                fontWeight: 800,
                background:
                  "linear-gradient(135deg,#2563eb,#7c3aed)",
              }}
            >
              A
            </Avatar>

            {!mobile && (
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  System Admin
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#64748b",
                  }}
                >
                  Administrator
                </Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {mobile && (
        <Sidebar
          mobile
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}