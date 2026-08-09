import {
  Card,
  CardContent,
  Box,
  Typography
} from "@mui/material";

export default function StatCard({
  title,
  value,
  subtitle,
  icon
}) {
  return (
    <Card
      sx={{
        height: "100%"
      }}
    >
      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "flex-start",
            gap: 2
          }}
        >

          <Box>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{ mt: 0.75 }}
            >
              {value}
            </Typography>

            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}

          </Box>

          {icon}

        </Box>

      </CardContent>
    </Card>
  );
}