"use client";

import { GoBack } from "@/components/go-back";
import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { Box, Paper, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import UsersForm from "../../_components/form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
};

export default function EditUser() {
  const router = useRouter();
  const snackBar = useSnackbar();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => api<User>(`/users/${id}`, { method: "GET" }),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (body: FormValues) =>
      api<User>(`users/${id}`, { method: "PUT", body }),
  });

  async function onSubmit(form: FormValues) {
    mutate(form, {
      onError: (error: Error) => snackBar.showSnack(error.message, "error"),
      onSuccess: (newUser: User) => {
        snackBar.showSnack("User edited successfully!", "success");
        router.push(`/users/${newUser.id}`);
      },
    });
  }

  if (isPending || isLoading || !data) {
    return <Loading />;
  }

  return (
    <Box>
      <GoBack />
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Edit User
        </Typography>
        <UsersForm onSubmit={onSubmit} defaultValues={data} />
      </Paper>
    </Box>
  );
}
