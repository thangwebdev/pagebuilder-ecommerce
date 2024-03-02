"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Logo from "./logo";
import Search from "./search";
import Right from "./right";
import { useMediaQuery } from "@mui/material";

function HeaderTop() {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{ width: "100%", height: "56px", backgroundColor: "primary.main" }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <Logo />
          {mdMatch && <Search />}
          <Right />
        </Stack>
      </Container>
    </Box>
  );
}

export default HeaderTop;
