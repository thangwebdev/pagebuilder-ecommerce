"use client";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import Image, { IImageProps } from "..";
import { Box } from "@mui/material";

interface IImageBuilderProps extends IImageProps {
  path: string;
  isContainer: boolean;
}

function ImageBuilder({
  path,
  src,
  width,
  height,
  isContainer,
  alt,
  link,
  href,
  ...props
}: IImageBuilderProps) {
  const { sx, style, ...builderWrapperProps } = useBuilderWrapper({
    path,
    sx: {},
    isContainer,
  });

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      {...builderWrapperProps}
      {...props}
    />
  );
}

export default ImageBuilder;
