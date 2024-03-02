"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import NavPopup from "../nav-popup";
import { usePathname } from "next/navigation";

export interface INavItemProps {
  children: React.ReactNode;
  href?: string;
  link?: string;
  imageUrl?: string;
  activeImageUrl?: string;
}

export default function NavItem({
  children,
  href,
  link,
  imageUrl,
  activeImageUrl,
}: INavItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  const render = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing="10px"
        sx={{
          height: "100%",
          padding: "0 5px",
        }}
      >
        {!!imageUrl && (
          <Image
            src={active ? activeImageUrl || imageUrl : imageUrl}
            alt="nav image"
            width={16}
            height={16}
          />
        )}
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {children}
        </Typography>
        <Stack
          className="nav-item-arrow"
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "16px",
            height: "16px",
            transition: "all linear 0.1s",
          }}
        >
          <MdOutlineKeyboardArrowRight size={16} />
        </Stack>
      </Stack>
    );
  };

  const renderChild = () => {
    if (link) {
      return (
        <a
          style={{ display: "inline-block", height: "100%" }}
          href={link}
          target="_blank"
        >
          {render()}
        </a>
      );
    }
    if (href) {
      return (
        <Link style={{ display: "inline-block", height: "100%" }} href={href}>
          {render()}
        </Link>
      );
    }
    return render();
  };
  return (
    <Box
      sx={{
        height: "100%",
        padding: "0 5px",
        position: "relative",
        color: active ? "primary.main" : "",
        "&::before": {
          content: active ? "''" : undefined,
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "2px",
          backgroundColor: "primary.main",
        },
        "&::after": {
          content: "''",
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          left: 0,
          width: 0,
          height: "2px",
          backgroundColor: "primary.main",
          transition: "all linear 0.1s",
        },
        "&:hover::after": {
          width: "100%",
        },
        "&:hover .nav-item-arrow": {
          transform: "rotate(90deg)",
        },
        "&:hover .nav-item-popup": {
          height: "auto",
        },
      }}
    >
      {renderChild()}
      {/* popup */}
      <NavPopup />
    </Box>
  );
}
