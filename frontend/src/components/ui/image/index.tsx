"use client";
import NextImage, { ImageLoaderProps, ImageProps } from "next/image";
import { CSSProperties, ForwardedRef, forwardRef, useMemo } from "react";
import { IDimension } from "~/types";
import { getSizeProps } from "~/utils/helpers";

export type sizeModeType = "dynamic" | "fill";

export interface IImageProps
  extends Omit<ImageProps, "width" | "height">,
    IDimension {
  sizeMode?: sizeModeType;
}

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

function Image(
  { src, alt, sizeMode = "dynamic", ...restProps }: IImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  const {
    sizeProps,
    props: { style, ...rest },
  } = getSizeProps(restProps);
  const {
    width,
    height,
    marginTop,
    unitMarginTop,
    marginBottom,
    unitMarginBottom,
    marginLeft,
    unitMarginLeft,
    marginRight,
    unitMarginRight,
  } = sizeProps;

  const imageStyle: { width: number; height: number; style: CSSProperties } =
    useMemo(() => {
      switch (sizeMode) {
        case "fill":
          return {
            width: 0,
            height: 0,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              ...style,
            },
          };

        default:
          return {
            width: !width ? 50 : width === "auto" ? 50 : Number(width),
            height: !height ? 50 : height === "auto" ? 50 : Number(height),
            style: {
              display: "inline-block",
              marginTop: !!marginTop ? `${marginTop}${unitMarginTop}` : "",
              marginBottom: !!marginBottom
                ? `${marginBottom}${unitMarginBottom}`
                : "",
              marginLeft: !!marginLeft ? `${marginLeft}${unitMarginLeft}` : "",
              marginRight: !!marginRight
                ? `${marginRight}${unitMarginRight}`
                : "",
              ...style,
            },
          };
      }
    }, [
      height,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      sizeMode,
      unitMarginBottom,
      unitMarginLeft,
      unitMarginRight,
      unitMarginTop,
      width,
      style,
    ]);

  return (
    <NextImage
      loader={imageLoader}
      src={src || "/images/draganddrop.png"}
      alt={alt}
      {...imageStyle}
      ref={ref}
      {...rest}
    />
  );
}

export default forwardRef(Image);
