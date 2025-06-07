"use client";

import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { createUser, User } from "@/services/users";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
};

export default function NewUser() {
  const router = useRouter();
  const snackBar = useSnackbar();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { isActive: true },
  });
  const { mutate, isPending } = useMutation({ mutationFn: createUser });

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

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
      <Paper
        elevation={3}
        sx={{ padding: 5 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid>
            <Input control={control} name="name" required label="Name" />
          </Grid>
          <Grid>
            <Input
              control={control}
              name="email"
              type="email"
              required
              label="Email"
            />
          </Grid>
          <Grid>
            <Input
              control={control}
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid>
            <Checkbox control={control} name="isActive" label="Is active" />
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="button"
              variant="outlined"
              sx={{ mr: 1 }}
              component={NextLink}
              href="/users"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
