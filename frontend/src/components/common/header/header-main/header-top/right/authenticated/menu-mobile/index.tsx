import React from "react";
import IconButton from "@mui/material/IconButton";
import { LuMenu } from "react-icons/lu";

function MenuMobile() {
  return (
    <>
      <IconButton sx={{ marginLeft: "20px", color: "common.white" }}>
        <LuMenu size={22} />
      </IconButton>
    </>
  );
}

export default MenuMobile;
