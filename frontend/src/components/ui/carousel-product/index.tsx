"use client";
import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "../typography";
import { LuArrowRightCircle } from "react-icons/lu";
import Link from "next/link";
import Product from "../product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { IDimension } from "~/types";
import {
  getSizeProps,
  generateSize,
  generateRandomString,
} from "~/utils/helpers";
import Image from "../image";

type OmitType =
  | "height"
  | "width"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop";

export interface ICarouselProductProps
  extends Omit<BoxProps, OmitType>,
    IDimension {
  title?: string;
  showHeader?: boolean;
  imgHeader?: string;
}

function CarouselProduct({
  title,
  showHeader = true,
  imgHeader,
  ...restProps
}: ICarouselProductProps) {
  const theme = useTheme();
  const { sizeProps, props } = getSizeProps(restProps);
  const id = generateRandomString(8);

  return (
    <Box
      sx={{
        userSelect: "none",
        ...generateSize(sizeProps, false),
      }}
      {...props}
    >
      {showHeader && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: "common.white",
            height: "60px",
            padding: "0 10px",
            borderBottom: "2px solid",
            borderColor: "primary.main",
          }}
        >
          <Stack direction="row" alignItems="center" spacing="10px">
            {imgHeader && (
              <Image
                src={imgHeader}
                alt="image"
                width={"30"}
                unitWidth="px"
                height={"30"}
                unitHeight="px"
              />
            )}
            {title && (
              <Typography
                variant="h3"
                fontWeight={500}
                fontSize={16}
                sx={{ color: "secondary.main", textTransform: "capitalize" }}
              >
                {title}
              </Typography>
            )}
          </Stack>
          <Link href="/products">
            <Stack
              direction="row"
              alignItems="center"
              spacing="5px"
              sx={{ color: "primary.main" }}
            >
              <Typography
                fontSize={14}
                fontWeight={500}
                sx={{ color: "primary.main" }}
              >
                Xem tất cả
              </Typography>
              <LuArrowRightCircle size={16} />
            </Stack>
          </Link>
        </Stack>
      )}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          "& .swiper-slide": { height: "unset", padding: "10px 0" },
        }}
      >
        <Swiper
          spaceBetween={10}
          breakpoints={{
            [theme.breakpoints.values.xs]: { slidesPerView: 2 },
            [theme.breakpoints.values.sm]: { slidesPerView: 3 },
            [theme.breakpoints.values.md]: { slidesPerView: 4 },
            [theme.breakpoints.values.lg]: { slidesPerView: 5 },
          }}
          navigation={{
            nextEl: `#carousel-product-next-${id}`,
            prevEl: `#carousel-product-prev-${id}`,
          }}
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{
            pauseOnMouseEnter: true,
          }}
        >
          {new Array(10).fill(0).map((_, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Product name={`Panadol extra gsk (h/180v) ${index + 1}`} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation Next Button */}
        <Box
          id={`carousel-product-next-${id}`}
          sx={{
            position: "absolute",
            zIndex: 10,
            top: "50%",
            right: 0,
            transform: "translate(10%, -50%)",
          }}
        >
          <IconButton
            sx={{
              width: "35px",
              height: "35px",
              backgroundColor: "white",
              boxShadow: "0 0 5px 0px #00000033",
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
          id={`carousel-product-prev-${id}`}
          sx={{
            position: "absolute",
            zIndex: 10,
            top: "50%",
            left: 0,
            transform: "translate(-10%, -50%)",
          }}
        >
          <IconButton
            sx={{
              width: "35px",
              height: "35px",
              backgroundColor: "white",
              boxShadow: "0 0 5px 0px #00000033",
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
      </Box>
    </Box>
  );
}

export default CarouselProduct;
