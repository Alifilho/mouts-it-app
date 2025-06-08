"use client";

import { Close } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Box,
  IconButton,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  SnackbarProps,
} from "@mui/material";
import { createContext, ReactNode, useState } from "react";

export type SnackbarContextProps = {
  showSnack: (
    message: string,
    type: AlertColor,
    action?: ReactNode,
    options?: SnackbarProps,
    duration?: number,
  ) => void;
};

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");
  const [action, setAction] = useState<ReactNode>();
  const [duration, setDuration] = useState<number>(1500);

  function showSnack(
    message: string,
    type: AlertColor,
    action?: ReactNode,
    _options?: SnackbarProps,
    _duration?: number,
  ) {
    setMessage(message);
    setAction(action);
    setType(type);
    setOpen(true);
    setDuration(_duration ?? 2000);
  }

  function onClose(_: unknown, reason?: SnackbarCloseReason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <SnackbarContext.Provider value={{ showSnack }}>
      {children}
      <Snackbar
        open={open}
        onClose={onClose}
        autoHideDuration={duration}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={type}
          sx={{ display: "flex", alignItems: "center" }}
          onClose={onClose}
          action={
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              {action}
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
                sx={{ ml: 1 }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
