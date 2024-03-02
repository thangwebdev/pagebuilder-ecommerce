import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

// Image must be 1280px width and 50px height

function TopImage() {
  return (
    <Box className="header-top-image" sx={{ width: "100%" }}>
      <Image
        src="/images/top-image.png"
        alt="top image"
        quality={100}
        width={1280}
        height={60}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </Box>
  );
}

export default TopImage;
