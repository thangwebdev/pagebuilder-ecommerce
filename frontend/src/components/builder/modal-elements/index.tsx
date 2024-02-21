"use client";
import Search from "./components/Search";
import Elements from "./components/Elements";
import { useState } from "react";
import { Box } from "@mui/material";
import ModalBase from "~/components/common/modalbase";

interface IModalElementsProps {
  open: boolean;
  onClose: () => void;
}

function ModalElements({ open, onClose }: IModalElementsProps) {
  const [search, setSearch] = useState<string>("");

  return (
    <ModalBase title="List element" open={open} onClose={onClose}>
      <Box
        sx={{
          width: "80vw",
          maxWidth: "800px",
          height: "80vh",
          overflow: "auto",
        }}
      >
        <Box sx={{ width: "100%", height: "100%", padding: "0 10px" }}>
          <Box sx={{ width: "100%", height: "40px", marginBottom: "5px" }}>
            <Search search={search} setSearch={setSearch} />
          </Box>
          <Box
            className="hidden-scrollbar"
            sx={{
              wid: "100%",
              height: "calc(100% - 40px - 5px)",
              overflow: "auto",
            }}
          >
            <Elements search={search} />
          </Box>
        </Box>
      </Box>
    </ModalBase>
  );
}

export default ModalElements;
