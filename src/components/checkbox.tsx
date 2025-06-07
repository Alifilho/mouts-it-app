import {
  CheckboxProps,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  extendOnChange?: (value: boolean) => void;
} & CheckboxProps &
  UseControllerProps<T>;

export function Checkbox<T extends FieldValues>({
  label,
  extendOnChange,
  required,
  ...props
}: Props<T>) {
  const {
    field: { onChange: fieldOnChange, ...field },
  } = useController({ ...props });

  function onChange(_: unknown, value: boolean) {
    if (extendOnChange) extendOnChange(value);
    return fieldOnChange(value);
  }

  return (
    <FormControlLabel
      label={label}
      required={required}
      control={
        <MuiCheckbox
          {...field}
          {...props}
          checked={field.value}
          onChange={onChange}
        />
      }
    />
  );
}
