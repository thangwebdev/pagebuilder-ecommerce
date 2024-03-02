import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

export interface INavItemProps {
  children: React.ReactNode;
  href?: string;
  link?: string;
  active?: boolean;
  imageUrl?: string;
  activeImageUrl?: string;
}

export default function NavSubItem({
  children,
  href,
  link,
  active,
  imageUrl,
  activeImageUrl,
}: INavItemProps) {
  const render = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing="5px"
        sx={{
          height: "100%",
          padding: "5px",
          position: "relative",
          borderRadius: "4px",
          color: active ? "primary.main" : "",
          backgroundColor: active ? "primary.100" : "common-white",
          cursor: active ? "default" : "pointer",
          pointerEvents: active ? "none" : "all",
          "&:hover": {
            backgroundColor: active ? "primary.100" : "divider",
          },
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
            fontWeight: 400,
          }}
        >
          {children}
        </Typography>
      </Stack>
    );
  };

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
}
