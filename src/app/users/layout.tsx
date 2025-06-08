"use client";

import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { api } from "@/lib/api";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  const snackBar = useSnackbar();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => api("auth/logout", { method: "POST" }),
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function onOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }
  function onCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function onLogout() {
    mutate(undefined, {
      onError: (error: Error) => snackBar.showSnack(error.message, "error"),
      onSuccess: () => {
        snackBar.showSnack("Logout successful!", "success");
        router.push("/sign-in");
      },
    });
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Mouts IT APP</Typography>
          <Button color="inherit" onClick={onOpenDeleteModal}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 5 }}>{children}</Box>
      <Dialog open={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteModal}>Cancel</Button>
          <Button onClick={onLogout} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
