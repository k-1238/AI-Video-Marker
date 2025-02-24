import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface FeatureCardProps {
  featureNumber: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ featureNumber }) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: "12px",
        transition: "box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Centers content horizontally
        height: 200, // Adjust height as needed
        "&:hover": { boxShadow: 6 },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 48,
          height: 48,
          backgroundColor: "blue.100",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb:1
        }}
      >
        <Typography variant="h5" color="primary">
          ✨
        </Typography>
      </Box>

      {/* Title */}
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
        Feature {featureNumber}
      </Typography>

      {/* Description */}
      <Typography
        color="text.secondary"
        textAlign="center"
        sx={{ px: 4  }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore.
      </Typography>
    </Card>
  );
};

export default FeatureCard;