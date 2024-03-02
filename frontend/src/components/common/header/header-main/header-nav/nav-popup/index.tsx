import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import NavSubItem from "../nav-subitem";

export default function NavPopup() {
  return (
    <Paper
      className="nav-item-popup"
      sx={{
        position: "absolute",
        zIndex: 10,
        top: "100%",
        left: 0,
        width: "auto",
        minWidth: "200px",
        height: 0,
        overflow: "auto",
        marginLeft: "0px !important",
        transition: "all linear 0.1s",
      }}
    >
      <Stack
        spacing="5px"
        sx={{ padding: "10px", maxHeight: "40vh", overflow: "auto" }}
      >
        <NavSubItem imageUrl="/images/khuyen_mai.svg" active href="/khuyen-mai">
          Khuyến mãi
        </NavSubItem>
        <NavSubItem imageUrl="/images/ma_giam_gia.svg" href="/ma-giam-gia">
          Mã giảm giá
        </NavSubItem>
      </Stack>
    </Paper>
  );
}
