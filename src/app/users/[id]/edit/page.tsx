"use client";

import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { getUser, updateUser, User } from "@/services/users";
import { Box, Link, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
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
    queryFn: async () => getUser(id as string),
  });
  const { mutate, isPending } = useMutation({ mutationFn: updateUser });

  async function onSubmit(form: FormValues) {
    mutate(
      { id: id as string, form },
      {
        onError: (error: Error) => snackBar.showSnack(error.message, "error"),
        onSuccess: (newUser: User) => {
          snackBar.showSnack("User edited successfully!", "success");
          router.push(`/users/${newUser.id}`);
        },
      },
    );
  }

  if (isPending || isLoading || !data) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        maxWidth: "100%",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link component={NextLink} href="/users" sx={{ mb: 2 }}>
        <Typography>Go back</Typography>
      </Link>
      <UsersForm onSubmit={onSubmit} defaultValues={data} />
    </Box>
  );
}
