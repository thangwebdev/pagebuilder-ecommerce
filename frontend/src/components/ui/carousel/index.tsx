"use client";
import { ForwardedRef, forwardRef } from "react";
import { Box, BoxProps, IconButton, Stack } from "@mui/material";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import "swiper/css/bundle";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IDimension } from "~/types";
import { generateSize, getSizeProps } from "~/utils/helpers";
import BuilderComponent, { IBuilderComponentProps } from "../builder-component";

type OmitType = "width" | "height";

export interface ICarouselProps
  extends Omit<SwiperProps, OmitType>,
    IDimension {
  wrapperProps?: BoxProps;
  itemHeight?: string;
  components?: IBuilderComponentProps[];
  isBuilding?: boolean;
}

function Carousel(
  {
    itemHeight = "",
    spaceBetween = 0,
    slidesPerView = 1,
    wrapperProps,
    components,
    isBuilding,
    loop,
    autoplay,
    ...restProps
  }: ICarouselProps,
  ref: ForwardedRef<unknown> | undefined
) {
  const { sizeProps, props } = getSizeProps(restProps);
  const { sx, ...restWrapperProps } = wrapperProps || {};

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        ...sx,
        ...generateSize(sizeProps, isBuilding),
      }}
      {...restWrapperProps}
    >
      {/* Navigation Next Button */}
      <Box
        id={`carousel-next${isBuilding ? "-building" : ""}`}
        sx={{
          position: "absolute",
          zIndex: 10,
          top: "50%",
          right: 0,
          transform: isBuilding
            ? "translate(-10px, -50%)"
            : "translate(50%, -50%)",
        }}
      >
        <IconButton
          sx={{
            width: "35px",
            height: "35px",
            backgroundColor: "white",
            boxShadow: "0 0 5px 0px #00000055",
            color: "primary.main",
            padding: 0,
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <MdNavigateNext size={20} />
        </IconButton>
      </Box>
      {/* Navigation Previous Button */}
      <Box
        id={`carousel-prev${isBuilding ? "-building" : ""}`}
        sx={{
          position: "absolute",
          zIndex: 10,
          top: "50%",
          left: 0,
          transform: isBuilding
            ? "translate(10px, -50%)"
            : "translate(-50%, -50%)",
        }}
      >
        <IconButton
          sx={{
            width: "35px",
            height: "35px",
            backgroundColor: "white",
            boxShadow: "0 0 5px 0px #00000055",
            color: "primary.main",
            padding: 0,
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <MdNavigateBefore size={20} />
        </IconButton>
      </Box>
      <Swiper
        spaceBetween={Number(spaceBetween)}
        slidesPerView={Number(slidesPerView)}
        pagination={{
          clickable: true,
          el: `#carousel-pagination${isBuilding ? "-building" : ""}`,
          bulletClass: `carousel-pagination-bullet`,
          bulletActiveClass: "carousel-pagination-bullet-active",
        }}
        navigation={{
          nextEl: `#carousel-next${isBuilding ? "-building" : ""}`,
          prevEl: `#carousel-prev${isBuilding ? "-building" : ""}`,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        loop={!!components && components.length >= 2 && loop ? loop : false}
        autoplay={
          !!autoplay
            ? {
                pauseOnMouseEnter: true,
              }
            : false
        }
        {...props}
      >
        {!!components && components.length > 0 ? (
          <>
            {components.map((comp) => (
              <SwiperSlide key={comp.path}>
                <Box
                  sx={{
                    width: "100%",
                    height: !!itemHeight ? `${itemHeight}px` : "auto",
                    overflow: "hidden",
                  }}
                >
                  <BuilderComponent
                    type={comp.type}
                    path={comp.path}
                    uniqueId={comp.uniqueId}
                    propData={comp.propData}
                    isBuilding={isBuilding}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: !!itemHeight ? `${itemHeight}px` : "200px",
              backgroundColor: "divider",
            }}
          ></Box>
        )}
      </Swiper>
      {/* Carousel pagination */}
      <Stack
        id={`carousel-pagination${isBuilding ? "-building" : ""}`}
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing="5px"
        sx={{
          position: "absolute",
          zIndex: 10,
          left: 0,
          bottom: 0,
          width: "100%",
          height: "15px",
          color: "primary.main",
        }}
      ></Stack>
    </Box>
  );
}
export default forwardRef(Carousel);
