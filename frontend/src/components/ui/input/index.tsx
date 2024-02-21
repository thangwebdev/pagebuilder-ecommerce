import MuiInput, { TextFieldProps } from "@mui/material/TextField";

export interface IInput {
  fontSize?: string;
}

export default function Input({
  sx,
  fontSize = "14px",
  multiline,
  ...props
}: IInput & Omit<TextFieldProps, "variant">) {
  return (
    <MuiInput
      multiline={multiline}
      sx={{
        width: "100%",
        height: "42px",
        "& input": {
          "&::placeholder": {
            fontSize,
          },
        },
        "& .MuiInputBase-root": {
          height: "100%",
          width: "100%",
          padding: multiline ? "0px" : "",
          "& .MuiInputBase-input": {
            width: "100%",
            height: "100%",
            padding: "5px 10px",
            fontSize,
            boxSizing: "border-box",
          },
        },
        ...sx,
      }}
      InputProps={{ autoComplete: "off" }}
      variant="outlined"
      {...props}
    />
  );
}
