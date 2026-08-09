import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  description = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "error",
  loading = false,
  onClose,
  onConfirm
}) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        <WarningAmberIcon color="warning" />

        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>

        <Button
          variant="contained"
          color={confirmColor}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}