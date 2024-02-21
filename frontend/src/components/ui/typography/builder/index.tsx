/* eslint-disable react/no-children-prop */
"use client";
import Typography, { ITypographyProps } from "..";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import { SxProps } from "@mui/material";

export interface ITypographyBuilderProps extends ITypographyProps {
  path: string;
  isContainer: boolean;
}

export default function TypographyBuilder({
  path,
  sx,
  isContainer,
  ...props
}: ITypographyBuilderProps) {
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });

  return <Typography {...builderWrapperProps} {...props} isBuilding />;
}
