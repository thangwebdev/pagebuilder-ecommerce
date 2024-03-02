"use client";
import React, { useRef } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { CiSearch } from "react-icons/ci";
import { FaFire } from "react-icons/fa6";

const medicines = [
  {
    name: "Paracetamol 500mg",
  },
  {
    name: "Calcisure",
  },
];

const hotWords = [
  { name: "Prednisolon" },
  { name: "Nizorol" },
  { name: "parnadol extra" },
  { name: "parnadol extra 100mg" },
];

function Search() {
  const searchWrapperRef = useRef();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        width: "50%",
        height: "42px",
        borderRadius: "6px",
        color: "primary.main",
        "&:focus-within": {
          boxShadow: "0 0 0 2px currentColor, 0 0 0 4px #000",
        },
      }}
      ref={searchWrapperRef}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ color: "common.black", width: "40px", height: "40px" }}
      >
        <CiSearch size={20} />
      </Stack>
      <Autocomplete
        forcePopupIcon={false}
        options={medicines}
        getOptionLabel={(option) => option.name}
        noOptionsText={
          <Typography
            sx={{ fontSize: "13px", fontStyle: "italic", textAlign: "center" }}
          >
            Không tìm thấy kết quả
          </Typography>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Tìm kiếm tên thuốc"
          />
        )}
        PopperComponent={(props) => {
          const { style, ...restProps } = props;
          return (
            <Popper
              {...restProps}
              anchorEl={searchWrapperRef?.current}
              style={{
                ...style,
                width: (searchWrapperRef.current as unknown as HTMLDivElement)
                  .clientWidth,
                paddingTop: "8px",
              }}
            ></Popper>
          );
        }}
        PaperComponent={(props) => {
          const { children, ...restProps } = props;
          return (
            <Paper {...restProps}>
              {children}
              <Stack
                sx={{
                  padding: "10px",
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" alignItems="center" spacing="4px">
                  <Box
                    sx={{
                      color: "error.main",
                      height: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    <FaFire size={13} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      lineHeight: "1",
                      fontStyle: "italic",
                      color: "grey.100",
                    }}
                  >
                    Từ khóa hot !!
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  rowGap="5px"
                  columnGap="5px"
                  sx={{ padding: "10px 0", flexWrap: "wrap" }}
                >
                  {hotWords.map((hotWord) => (
                    <Button
                      key={hotWord.name}
                      sx={{
                        width: "fit-content",
                        fontSize: "13px",
                        padding: "5px 10px",
                        borderRadius: "50px",
                        backgroundColor: "divider",
                        color: "common.black",
                        "&:hover": {
                          backgroundColor: "error.100",
                        },
                      }}
                    >
                      {hotWord.name}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          );
        }}
        ListboxProps={{
          sx: {
            maxHeight: "40vh",
            "& .MuiAutocomplete-option": { fontSize: "13px" },
          },
        }}
        sx={{
          minWidth: "unset",
          flex: 1,
          "& .MuiFormControl-root": {
            "& .MuiInputBase-root": {
              height: "42px",
              padding: 0,
              "& .MuiInputBase-input": {
                padding: 0,
                height: "100%",
                fontSize: "13px",
                "&::placeholder": {
                  fontSize: "13px",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
                outline: "none",
              },
            },
          },
        }}
      />
    </Box>
  );
}

export default Search;
