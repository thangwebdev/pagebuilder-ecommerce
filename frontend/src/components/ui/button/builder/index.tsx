"use client";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import Button, { IButtonProps } from "..";
import { SxProps } from "@mui/material";

export interface IButtonBuilderProps extends IButtonProps {
  path: string;
  isContainer: boolean;
}

function ButtonBuilder({
  path,
  sx,
  isContainer,
  link,
  href,
  ...props
}: IButtonBuilderProps) {
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });

  return <Button {...builderWrapperProps} {...props} />;
}
export default ButtonBuilder;
