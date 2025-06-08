"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function GoBack() {
  const router = useRouter();

  function onRedirect() {
    router.back();
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<ArrowBack />}
      onClick={onRedirect}
      sx={{ mb: 2 }}
    >
      Go Back
    </Button>
  );
}
