import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  mobileSidebarOpen: false,

  loading: false,

  globalError: null,

  notification: {
    open: false,
    message: "",
    severity: "info"
  },

  confirmDialog: {
    open: false,
    title: "",
    description: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    severity: "error"
  }
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {

    
    toggleSidebar(state) {
      state.sidebarOpen =
        !state.sidebarOpen;
    },

    setSidebarOpen(state, action) {
      state.sidebarOpen =
        action.payload;
    },

    openMobileSidebar(state) {
      state.mobileSidebarOpen = true;
    },

    closeMobileSidebar(state) {
      state.mobileSidebarOpen = false;
    },

    

    setLoading(state, action) {
      state.loading =
        action.payload;
    },

    
    setGlobalError(state, action) {
      state.globalError =
        action.payload;
    },

    clearGlobalError(state) {
      state.globalError = null;
    },

    

    showNotification(state, action) {
      state.notification = {
        open: true,

        message:
          action.payload.message ||
          "",

        severity:
          action.payload.severity ||
          "info"
      };
    },

    hideNotification(state) {
      state.notification.open =
        false;
    },

    

    openConfirmDialog(state, action) {
      state.confirmDialog = {
        open: true,

        title:
          action.payload.title ||
          "Confirm Action",

        description:
          action.payload.description ||
          "Are you sure you want to continue?",

        confirmText:
          action.payload.confirmText ||
          "Confirm",

        cancelText:
          action.payload.cancelText ||
          "Cancel",

        severity:
          action.payload.severity ||
          "error"
      };
    },

    closeConfirmDialog(state) {
      state.confirmDialog = {
        open: false,
        title: "",
        description: "",
        confirmText: "Confirm",
        cancelText: "Cancel",
        severity: "error"
      };
    }

  }
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openMobileSidebar,
  closeMobileSidebar,

  setLoading,

  setGlobalError,
  clearGlobalError,

  showNotification,
  hideNotification,

  openConfirmDialog,
  closeConfirmDialog

} = uiSlice.actions;

export default uiSlice.reducer;