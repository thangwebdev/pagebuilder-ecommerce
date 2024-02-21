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
  ...props
}: IImageBuilderProps) {
  const { sx, style, ...builderWrapperProps } = useBuilderWrapper({
    path,
    sx: {},
    isContainer,
  });

  if (props.sizeMode === "dynamic") {
    return (
      <Box
        sx={{ ...sx, width: "fit-content", height: "fit-content", padding: 0 }}
        style={style}
        {...builderWrapperProps}
      >
        <Image src={src} width={width} height={height} alt={alt} {...props} />
      </Box>
    );
  } else {
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
}

export default ImageBuilder;
