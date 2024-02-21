"use client";
import Link from "next/link";
import React, {
  ForwardedRef,
  HTMLAttributeAnchorTarget,
  forwardRef,
} from "react";
import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { IDimension } from "~/types";
import { generateSize, getSizeProps } from "~/utils/helpers";

export interface IButtonProps extends MuiButtonProps, IDimension {
  link?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  fontSize?: string;
  isBuilding?: boolean;
}

function Button(
  {
    children,
    href,
    target,
    link,
    sx,
    fontSize,
    isBuilding,
    ...restProps
  }: IButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { sizeProps, props } = getSizeProps(restProps);

  const renderButton = () => {
    return (
      <MuiButton
        ref={ref}
        sx={{
          minWidth: "unset",
          "&.MuiButton-contained": {
            color: "white",
            boxShadow: "none",
          },
          ...sx,
          ...generateSize(sizeProps, isBuilding),
          fontSize: fontSize ? `${fontSize}px` : undefined,
        }}
        {...props}
      >
        {children}
      </MuiButton>
    );
  };

  if (href) {
    return (
      <Link href={href} target={target}>
        {renderButton()}
      </Link>
    );
  }
  if (link) {
    return (
      <a href={link} target={target}>
        {renderButton()}
      </a>
    );
  }

  return renderButton();
}

export default forwardRef(Button);
