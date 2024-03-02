import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function UnAuthenticate() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        border: "2px solid",
        borderColor: "common.white",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <Button
        variant="contained"
        sx={{
          color: "common.white",
          fontSize: "13px",
          borderRadius: "0px",
          border: "none",
          boxShadow: "none",
          height: "42px",
        }}
      >
        ĐĂNG KÝ
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "common.white",
          fontSize: "13px",
          padding: "5px 10px",
          height: "42px",
          borderRadius: "0px",
          border: "none",
          color: "primary.main",
          "&:hover": {
            backgroundColor: "common.white",
          },
        }}
      >
        ĐĂNG NHẬP
      </Button>
    </Stack>
  );
}

export default UnAuthenticate;
