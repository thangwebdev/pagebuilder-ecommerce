"use client";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import Carousel, { ICarouselProps } from "..";
import { SxProps } from "@mui/material";
import "swiper/css/bundle";

interface ICarouselBuilder extends ICarouselProps {
  path: string;
  isContainer: boolean;
}

function CarouselBuilder({
  path,
  isContainer,
  wrapperProps,
  ...restProps
}: ICarouselBuilder) {
  const { sx, ...restWrapperProps } = wrapperProps || {};
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });
  const { autoplay, ...props } = restProps;

  return (
    <Carousel
      wrapperProps={{ ...builderWrapperProps, ...restWrapperProps }}
      {...props}
      isBuilding
    />
  );
}
export default CarouselBuilder;
