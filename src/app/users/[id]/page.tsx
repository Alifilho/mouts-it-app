"use client";

import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { deleteUser, getUser } from "@/services/users";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const router = useRouter();
  const snackBar = useSnackbar();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => getUser(id as string),
  });
  const { mutate, isPending } = useMutation({ mutationFn: deleteUser });

  if (isLoading || isPending || !data) {
    return <Loading />;
  }

  async function onDelete() {
    mutate(id as string, {
      onError: (error: Error) => snackBar.showSnack(error.message, "error"),
      onSuccess: () => {
        snackBar.showSnack("User deleted successfully!", "success");
        router.push("/users");
      },
    });
  }

  function onOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }
  function onCloseDeleteModal() {
    setIsDeleteModalOpen(false);
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
      <Card sx={{ minWidth: 350 }}>
        <CardHeader title={`User Details - ${id}`} />
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Name
          </Typography>
          <Typography sx={{ mb: 1.5 }}>{data.name}</Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Email
          </Typography>
          <Typography sx={{ mb: 1.5 }}>{data.email}</Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Created at
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            {new Date(data.createdAt).toLocaleDateString()}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Updated at
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            {new Date(data.updatedAt).toLocaleDateString()}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Is active
          </Typography>
          {data.isActive ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" onClick={onOpenDeleteModal}>
            Delete
          </Button>
          <Button
            LinkComponent={NextLink}
            href={`/users/${id}/edit`}
            variant="contained"
            size="small"
          >
            Edit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <DialogTitle>Delete user {data.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteModal}>Cancel</Button>
          <Button onClick={onDelete} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
