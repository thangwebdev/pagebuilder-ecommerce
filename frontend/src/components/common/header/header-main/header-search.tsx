"use client";
import { Autocomplete, TextField } from "@mui/material";
import { LuSearch } from "react-icons/lu";
import Box from "@mui/material/Box";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

export default function HeaderSearch() {
  return (
    <Box sx={{ width: "600px" }}>
      <Autocomplete
        disablePortal
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={({ InputProps, ...params }) => (
          <TextField
            placeholder="Tìm kiếm sản phẩm"
            InputProps={{
              ...InputProps,
              startAdornment: (
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "divider",
                  }}
                >
                  <LuSearch size={20} />
                </Box>
              ),
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
            {...params}
          />
        )}
      />
    </Box>
  );
}
