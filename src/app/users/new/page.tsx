"use client";

import { GoBack } from "@/components/go-back";
import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { Box, Paper, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import UsersForm from "../_components/form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
};

export default function NewUser() {
  const router = useRouter();
  const snackBar = useSnackbar();
  const { mutate, isPending } = useMutation({
    mutationFn: (body: FormValues) =>
      api<User>("users", { method: "POST", body }),
  });

  async function onSubmit(form: FormValues) {
    mutate(form, {
      onError: (error: Error) => snackBar.showSnack(error.message, "error"),
      onSuccess: (newUser: User) => {
        snackBar.showSnack("User created successfully!", "success");
        router.push(`/users/${newUser.id}`);
      },
    });
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Box>
      <GoBack />
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          New User
        </Typography>
        <UsersForm onSubmit={onSubmit} />
      </Paper>
    </Box>
  );
}
