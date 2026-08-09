import {
  Box,
  Button,
  Breadcrumbs,
  Link,
  Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  Link as RouterLink
} from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  actionLabel,
  actionIcon,
  onAction,
  breadcrumbs = [],
  children
}) {
  return (
    <Box sx={{ mb: 3 }}>

      {breadcrumbs.length > 0 && (
        <Breadcrumbs
          sx={{ mb: 1.5 }}
          aria-label="breadcrumb"
        >
          {breadcrumbs.map(
            (item, index) => {

              const isLast =
                index ===
                breadcrumbs.length - 1;

              if (isLast) {
                return (
                  <Typography
                    key={index}
                    color="text.primary"
                  >
                    {item.label}
                  </Typography>
                );
              }

              return (
                <Link
                  key={index}
                  component={RouterLink}
                  to={item.path}
                  underline="hover"
                  color="inherit"
                >
                  {item.label}
                </Link>
              );
            }
          )}
        </Breadcrumbs>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center"
          },
          gap: 2,
          flexWrap: "wrap"
        }}
      >
        <Box>
          <Typography variant="h4">
            {title}
          </Typography>

          {subtitle && (
            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center"
          }}
        >
          {children}

          {actionLabel && (
            <Button
              variant="contained"
              startIcon={
                actionIcon || <AddIcon />
              }
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}