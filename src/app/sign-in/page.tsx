"use client";

import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { useSnackbar } from "@/hooks/use-snackbar";
import { signIn } from "@/services/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = { email: string; password: string };

export default function SignIn() {
  const router = useRouter();
  const snackBar = useSnackbar();
  const { control, handleSubmit } = useForm<FormValues>();
  const { mutate, isPending } = useMutation({ mutationFn: signIn });

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: FormValues) {
    mutate(data, {
      onError: (error: Error) => snackBar.showSnack(error.message, "error"),
      onSuccess: () => {
        snackBar.showSnack("Sign in successful!", "success");
        router.push("/users");
      },
    });
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 2 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h5" mt={2}>
          Sign in
        </Typography>
        <Input
          control={control}
          name="email"
          type="email"
          placeholder="email@mouts.com"
          required
          sx={{ marginTop: 2 }}
          label="Email"
        />
        <Input
          control={control}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          label="Password"
          sx={{ marginTop: 2 }}
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
        <Button
          sx={{ marginTop: 2 }}
          type="submit"
          variant="contained"
          fullWidth
          loading={isPending}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
}
