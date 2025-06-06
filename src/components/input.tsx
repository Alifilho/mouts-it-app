"use client";

import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { ChangeEvent } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type Props<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    extendOnChange?: (value: string | number) => void;
  };

export function Input<T extends FieldValues>({
  extendOnChange,
  type,
  children,
  ...props
}: Props<T>) {
  const {
    field: { onChange: fieldOnChange, value, ...field },
    fieldState: { error },
  } = useController({ ...props });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (extendOnChange) extendOnChange(inputValue);
    fieldOnChange(inputValue);
  }

  return (
    <TextField
      slotProps={{
        select: { MenuProps: { PaperProps: { style: { maxWidth: "450px" } } } },
      }}
      fullWidth
      margin="dense"
      variant="outlined"
      type={type}
      error={!!error}
      onChange={onChange}
      value={value || ""}
      helperText={error?.message}
      {...field}
      {...props}
    >
      {children}
    </TextField>
  );
}
