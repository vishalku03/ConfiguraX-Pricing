import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import { useSnackbar } from "notistack";

import ComponentForm from "../../components/components/ComponentForm";

import {
  getComponentById,
  updateComponent,
} from "../../services/componentService";

export default function EditComponentPage() {
  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const { enqueueSnackbar } =
    useSnackbar();

  
  // Component state
 

  const [component, setComponent] =
    useState(null);

 
  // Loading
  

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // Error


  const [error, setError] =
    useState("");

 
  // Fetch component


  useEffect(() => {
    let mounted = true;

    const loadComponent =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await getComponentById(
              id
            );

          if (!mounted) {
            return;
          }


          const item =
            response?.component ||
            response?.data ||
            null;

          if (!item) {
            setError(
              "Component not found."
            );

            return;
          }

          setComponent(
            item
          );
        } catch (err) {
          console.error(
            "Failed to load component:",
            err
          );

          if (!mounted) {
            return;
          }

          setError(
            err?.response?.data
              ?.message ||
              "Unable to load component."
          );
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    if (id) {
      loadComponent();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  
  // Update component
 

  const submit = async (
    data
  ) => {
    try {
      setSaving(true);
      setError("");

      const payload = {
        name:
          data.name?.trim(),

        category:
          data.category,

        price:
          Number(data.price),

        description:
          data.description?.trim() ||
          "",
      };

      const response =
        await updateComponent(
          id,
          payload
        );

      console.log(
        "Component updated:",
        response
      );

      enqueueSnackbar(
        "Component updated successfully.",
        {
          variant:
            "success",
        }
      );

      navigate(
        "/components"
      );
    } catch (err) {
      console.error(
        "Update component error:",
        err
      );

      const message =
        err?.response?.data
          ?.message ||
        err?.message ||
        "Unable to update component.";

      setError(message);

      enqueueSnackbar(
        message,
        {
          variant:
            "error",
        }
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading screen
  

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  // Not found / error
  

  if (
    error &&
    !component
  ) {
    return (
      <Box>
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/components"
            )
          }
        >
          Back to Components
        </button>
      </Box>
    );
  }

  
  // Edit page
 

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
        initialValues={
          component
        }
        onSubmit={submit}
        loading={saving}
        submitLabel="Update Component"
        title="Edit Component"
      />
    </Box>
  );
}