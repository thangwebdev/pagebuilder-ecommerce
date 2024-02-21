import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
  SxProps,
} from "@mui/material";

export type OptionType = {
  value: string;
  label: string;
};

export interface ISelectProps extends SelectProps {
  options: OptionType[];
  defaultValue?: string;
  fontSize?: string;
  wrapperStyle?: SxProps;
}

function Select({
  sx,
  wrapperStyle,
  value,
  defaultValue,
  fontSize = "14px",
  options,
  onChange,
  ...props
}: ISelectProps) {
  return (
    <FormControl fullWidth sx={{ width: "fit-content", ...wrapperStyle }}>
      <MuiSelect
        value={value}
        onChange={onChange}
        sx={{
          width: "100%",
          height: "42px",
          "& .MuiSelect-select": {
            width: "100%",
            height: "100%",
            padding: "5px 10px",
            fontSize,
          },
          ...sx,
        }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ fontSize }}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;
