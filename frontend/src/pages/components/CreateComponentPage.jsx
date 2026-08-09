import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import { useSnackbar } from "notistack";

import {
  createComponent,
} from "../../services/componentService";

import ComponentForm from "../../components/components/ComponentForm";

export default function CreateComponentPage() {
  const navigate = useNavigate();

  const { enqueueSnackbar } =
    useSnackbar();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");



  const submit = async (data) => {
    try {
      setLoading(true);
      setError("");

   

      const payload = {
        name: data.name?.trim(),

        category: data.category,

        price: Number(data.price),

        description:
          data.description?.trim() || "",
      };

    

      if (!payload.name) {
        throw new Error(
          "Component name is required."
        );
      }

      if (!payload.category) {
        throw new Error(
          "Component category is required."
        );
      }

      if (
        Number.isNaN(payload.price) ||
        payload.price < 0
      ) {
        throw new Error(
          "Please enter a valid price."
        );
      }

      

      const response =
        await createComponent(
          payload
        );

      console.log(
        "Component created:",
        response
      );

     

      enqueueSnackbar(
        "Component created successfully.",
        {
          variant: "success",
        }
      );

    

      navigate(
        "/components"
      );
    } catch (err) {
      console.error(
        "Create component error:",
        err
      );

      const message =
        err?.response?.data
          ?.message ||
        err?.message ||
        "Unable to create component.";

      setError(message);

      enqueueSnackbar(
        message,
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
    

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}



      <ComponentForm
        onSubmit={submit}
        loading={loading}
      />

     

      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              "rgba(255,255,255,0.45)",
            zIndex: 1500,
            pointerEvents: "none",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}