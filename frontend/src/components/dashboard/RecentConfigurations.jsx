import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import {
  useNavigate
} from "react-router-dom";

import {
  formatCurrency,
  formatDate
} from "../../utils/formatters";

import EmptyState
  from "../common/EmptyState";

export default function RecentConfigurations({
  items = []
}) {
  const navigate =
    useNavigate();

  return (
    <Card>

      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            mb: 1
          }}
        >

          <Typography variant="h6">
            Recent Configurations
          </Typography>

          <Button
            onClick={() =>
              navigate(
                "/configurations"
              )
            }
          >
            View All
          </Button>

        </Box>

        {!items.length ? (

          <EmptyState
            title="No configurations yet"
            description="Create your first laptop configuration."
            actionLabel="Create Configuration"
            onAction={() =>
              navigate(
                "/configurations/new"
              )
            }
          />

        ) : (

          items
            .slice(0, 5)
            .map((item) => (

              <Box
                key={item.id}
                onClick={() =>
                  navigate(
                    `/configurations/${item.id}`
                  )
                }
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  py: 1.5,
                  borderBottom:
                    "1px solid",
                  borderColor:
                    "divider",
                  cursor: "pointer"
                }}
              >

                <Box>

                  <Typography
                    fontWeight={600}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {formatDate(
                      item.createdAt
                    )}
                  </Typography>

                </Box>

                <Typography
                  fontWeight={700}
                >
                  {formatCurrency(
                    item.totalPrice
                  )}
                </Typography>

              </Box>

            ))

        )}

      </CardContent>

    </Card>
  );
}