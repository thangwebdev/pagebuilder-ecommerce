import { SelectChangeEvent, Stack } from "@mui/material";
import Input from "~/components/ui/input";
import Select from "~/components/ui/select";

export interface IInputSizeProps {
  inputValue: string;
  selectValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: () => void;
  onSelectChange: (e: SelectChangeEvent<unknown>) => void;
  selectOptions: { label: string; value: string }[];
  disableInput?: boolean;
  disableSelect?: boolean;
  placeholder?: string;
}

function InputSize({
  inputValue,
  selectValue,
  selectOptions,
  onInputBlur,
  onInputChange,
  onSelectChange,
  disableInput,
  disableSelect,
  placeholder,
}: IInputSizeProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        border: "2px solid",
        borderColor: "divider",
        width: "fit-content",
        borderRadius: "4px",
        "&:focus-within": {
          borderColor: "primary.main",
        },
      }}
    >
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={onInputChange}
        onBlur={onInputBlur}
        sx={{
          width: "50px",
          height: "30px",
          textAlign: "center",
          "& fieldset": { border: "none" },
        }}
        fontSize="12px"
        disabled={disableInput}
      />
      <Select
        sx={{
          width: "30px",
          height: "30px",
          borderRadius: "0px",
          borderLeft: "1px solid",
          borderColor: "divider",
          "& .MuiSelect-select": {
            width: "100%",
            height: "100%",
            padding: "0px !important",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& fieldset": { border: "none" },
        }}
        options={selectOptions}
        value={selectValue}
        onChange={onSelectChange}
        IconComponent={() => null}
        displayEmpty
        fontSize="12px"
        disabled={disableSelect}
      />
    </Stack>
  );
}

export default InputSize;
