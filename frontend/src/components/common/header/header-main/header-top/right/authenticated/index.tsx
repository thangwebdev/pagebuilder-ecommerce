"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Notification from "./Notification";
import Cart from "./Cart";
import UserInfo from "./UserInfo";
import { useMediaQuery } from "@mui/material";
import MenuMobile from "./menu-mobile";

function Authenticated() {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack direction="row" alignItems="center">
      <Notification />
      <Cart />
      {mdMatch ? <UserInfo /> : <MenuMobile />}
    </Stack>
  );
}

export default Authenticated;
