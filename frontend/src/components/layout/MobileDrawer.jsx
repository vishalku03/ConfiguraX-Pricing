import {
  Box,
  Drawer,
  IconButton,
  Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  closeMobileSidebar
} from "../../store/slices/uiSlice";

import Sidebar
  from "./Sidebar";

export default function MobileDrawer() {
  const dispatch = useDispatch();

  const {
    mobileSidebarOpen
  } = useSelector(
    (state) => state.ui
  );

  const handleClose = () => {
    dispatch(
      closeMobileSidebar()
    );
  };

  return (
    <Drawer
      anchor="left"
      open={mobileSidebarOpen}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        display: {
          xs: "block",
          md: "none"
        },

        "& .MuiDrawer-paper": {
          width: 270,
          boxSizing: "border-box"
        }
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >

        {/* Mobile Header */}

        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            px: 2,
            borderBottom:
              "1px solid",
            borderColor:
              "divider"
          }}
        >

          <Typography
            variant="h6"
            fontWeight={700}
          >
            LaptopPrice
          </Typography>

          <IconButton
            onClick={handleClose}
            aria-label="Close navigation"
          >
            <CloseIcon />
          </IconButton>

        </Box>

        {/* Navigation */}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto"
          }}
        >
          <Sidebar
            mobile
            onNavigate={handleClose}
          />
        </Box>

      </Box>
    </Drawer>
  );
}