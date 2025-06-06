"use server";

import { Box, CircularProgress, Typography } from "@mui/material";

export async function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 1 }}>
        Loading...
      </Typography>
    </Box>
  );
}
