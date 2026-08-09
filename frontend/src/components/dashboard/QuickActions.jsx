import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MemoryIcon from "@mui/icons-material/Memory";

import {
  useNavigate
} from "react-router-dom";

export default function QuickActions() {

  const navigate =
    useNavigate();

  return (
    <Card>

      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
        >
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 1.5
          }}
        >

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              navigate(
                "/configurations/new"
              )
            }
          >
            Create Configuration
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <MemoryIcon />
            }
            onClick={() =>
              navigate(
                "/components/new"
              )
            }
          >
            Add Component
          </Button>

        </Box>

      </CardContent>

    </Card>
  );
}