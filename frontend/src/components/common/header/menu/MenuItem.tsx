import Image from "next/image";
import React from "react";
import Box from "@mui/material/Box";
import Button from "~/components/ui/button";

interface IMenuItemProps {
  children?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

function MenuItem({ children, href, icon }: IMenuItemProps) {
  return (
    <Box
      sx={{
        "&:hover .menu-item__underline": {
          width: "100%",
        },
      }}
    >
      <Button
        href={href}
        startIcon={icon}
        sx={{ color: "#fff", fontWeight: 500 }}
      >
        {children}
      </Button>
      <Box
        className="menu-item__underline"
        sx={{
          width: "0px",
          height: "2px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          transition: "all linear 0.1s",
          transformOrigin: "50% 0",
        }}
      ></Box>
    </Box>
  );
}

export default MenuItem;
