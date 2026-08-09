import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
      dark: "#1d4ed8",
      light: "#60a5fa",
      contrastText: "#fff",
    },

    secondary: {
      main: "#7c3aed",
      dark: "#6d28d9",
      light: "#a78bfa",
      contrastText: "#fff",
    },

    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },

    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },

    success: {
      main: "#16a34a",
    },

    warning: {
      main: "#d97706",
    },

    error: {
      main: "#dc2626",
    },

    divider: "#e5e7eb",
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

    h3: {
      fontWeight: 800,
      letterSpacing: "-0.8px",
    },

    h4: {
      fontWeight: 800,
      letterSpacing: "-0.6px",
    },

    h5: {
      fontWeight: 750,
    },

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: "#f5f7fb",
        },

        "*": {
          boxSizing: "border-box",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          minHeight: 42,
          borderRadius: 10,
          padding: "8px 17px",
        },

        containedPrimary: {
          background:
            "linear-gradient(135deg, #2563eb, #4f46e5)",

          "&:hover": {
            background:
              "linear-gradient(135deg, #1d4ed8, #4338ca)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          boxShadow:
            "0 4px 20px rgba(15, 23, 42, 0.045)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#94a3b8",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2563eb",
            borderWidth: 2,
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f8fafc",

          "& .MuiTableCell-head": {
            color: "#475569",
            fontWeight: 700,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.15s ease",

          "&:hover": {
            backgroundColor: "#f8fafc",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 8,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});