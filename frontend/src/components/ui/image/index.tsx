"use client";
import NextImage, { ImageLoaderProps, ImageProps } from "next/image";
import Link from "next/link";
import {
  CSSProperties,
  ForwardedRef,
  HTMLAttributeAnchorTarget,
  forwardRef,
  useMemo,
} from "react";
import { IDimension } from "~/types";
import { getSizeProps } from "~/utils/helpers";
export interface IImageProps
  extends Omit<ImageProps, "width" | "height">,
    IDimension {
  link?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  objectFit?: CSSProperties["objectFit"];
}

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

function Image(
  { src, alt, link, href, target, objectFit, ...restProps }: IImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  const {
    sizeProps,
    props: { style, ...rest },
  } = getSizeProps(restProps);
  const {
    width,
    height,
    unitWidth,
    unitHeight,
    marginTop,
    unitMarginTop,
    marginBottom,
    unitMarginBottom,
    marginLeft,
    unitMarginLeft,
    marginRight,
    unitMarginRight,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  } = sizeProps;

  const sizeStyle: CSSProperties = useMemo(() => {
    return {
      display: "inline-block",
      width: !!width && width !== "auto" ? `${width}${unitWidth}` : "100%",
      height: !!height && height !== "auto" ? `${height}${unitHeight}` : "100%",
      marginTop: !!marginTop ? `${marginTop}${unitMarginTop}` : "",
      marginBottom: !!marginBottom ? `${marginBottom}${unitMarginBottom}` : "",
      marginLeft: !!marginLeft ? `${marginLeft}${unitMarginLeft}` : "",
      marginRight: !!marginRight ? `${marginRight}${unitMarginRight}` : "",
      borderRadius: `${borderTopLeftRadius || 0}px ${
        borderTopRightRadius || 0
      }px ${borderBottomRightRadius || 0}px ${borderBottomLeftRadius || 0}px`,
    };
  }, [
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    height,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    unitHeight,
    unitMarginBottom,
    unitMarginLeft,
    unitMarginRight,
    unitMarginTop,
    unitWidth,
    width,
  ]);

  const renderImage = () => {
    return (
      <NextImage
        loader={imageLoader}
        src={src || "/images/draganddrop.png"}
        alt={alt}
        width={50}
        height={50}
        style={{
          objectFit: objectFit,
          ...sizeStyle,
        }}
        ref={ref}
        {...rest}
      />
    );
  };

  if (href) {
    return (
      <Link href={href} target={target}>
        {renderImage()}
      </Link>
    );
  }
  if (link) {
    return (
      <a href={link} target={target}>
        {renderImage()}
      </a>
    );
  }

  return renderImage();
}

export default forwardRef(Image);
