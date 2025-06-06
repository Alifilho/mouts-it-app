import { SnackbarContext } from "@/providers/snackbar";
import { useContext } from "react";

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
}
