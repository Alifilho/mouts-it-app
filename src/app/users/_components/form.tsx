"use client";

import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, IconButton, InputAdornment, Paper } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
};

type Props = {
  defaultValues?: Partial<FormValues>;
  onSubmit(form: FormValues): Promise<void>;
};

export default function UsersForm({ onSubmit, defaultValues }: Props) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: defaultValues || { isActive: true },
  });

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
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
            {defaultValues ? "Update" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
