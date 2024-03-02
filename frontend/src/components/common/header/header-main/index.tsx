"use client";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import HeaderTop from "./header-top";
import HeaderNav from "./header-nav";

export interface IHeaderMainProps {}

function HeaderMain({}: IHeaderMainProps) {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 1000,
        top: 0,
        width: "100%",
      }}
    >
      <HeaderTop />
      {mdMatch && <HeaderNav />}
    </Box>
  );
}

export default HeaderMain;
