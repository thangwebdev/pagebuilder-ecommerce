"use client";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { FaList } from "react-icons/fa6";
import Button from "~/components/ui/button";

interface IHeaderAdmin {
  toggleSideBar?: () => void;
}

export default function HeaderAdmin({ toggleSideBar }: IHeaderAdmin) {
  return (
    <Box
      sx={{ height: "40px", width: "100%", backgroundColor: "primary.main" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%", height: "100%", padding: "0px 12px" }}
      >
        <IconButton onClick={toggleSideBar} sx={{ color: "white" }}>
          <FaList size={20} />
        </IconButton>
        <Button
          link="https://thangwebdev.click"
          target="_blank"
          sx={{ color: "white" }}
        >
          thangwebdev.click
        </Button>
      </Stack>
    </Box>
  );
}
