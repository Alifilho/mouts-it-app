"use client";

import { GoBack } from "@/components/go-back";
import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
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
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

function CardDetails({ title, value }: { title: string; value: ReactNode }) {
  return (
    <>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        {title}
      </Typography>
      <Typography sx={{ mb: 1.5 }}>{value}</Typography>
    </>
  );
}

export default function UserDetail() {
  const { id } = useParams();
  const router = useRouter();
  const snackBar = useSnackbar();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => api<User>(`users/${id}`, { method: "GET" }),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => api(`users/${id}`, { method: "DELETE" }),
  });

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
    <Box>
      <GoBack />
      <Card sx={{ minWidth: 350 }}>
        <CardHeader title={`User Details - ${id}`} />
        <CardContent>
          <CardDetails title="Name" value={data.name} />
          <CardDetails title="Email" value={data.email} />
          <CardDetails
            title="Created at"
            value={new Date(data.createdAt).toLocaleDateString()}
          />
          <CardDetails
            title="Updated at"
            value={new Date(data.updatedAt).toLocaleDateString()}
          />
          <CardDetails
            title="Is active"
            value={data.isActive ? <CheckBox /> : <CheckBoxOutlineBlank />}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onOpenDeleteModal} variant="outlined">
            Delete
          </Button>
          <Button
            LinkComponent={NextLink}
            href={`/users/${id}/edit`}
            variant="contained"
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
