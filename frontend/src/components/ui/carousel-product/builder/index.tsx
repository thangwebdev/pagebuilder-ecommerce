"use client";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import { ICarouselProductProps } from "..";
import { Box, Stack, SxProps } from "@mui/material";
import Typography from "../../typography";
import { LuArrowRightCircle } from "react-icons/lu";
import { generateSize, getSizeProps } from "~/utils/helpers";
import Image from "../../image";

interface ICarouselProductBuilderProps extends ICarouselProductProps {
  path: string;
  isContainer: boolean;
}

function CarouselProductBuilder({
  path,
  sx,
  isContainer,
  showHeader,
  imgHeader,
  title,
  ...restProps
}: ICarouselProductBuilderProps) {
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });
  const { sx: builderSx, ...restBuilderWrapperProps } = builderWrapperProps;
  const { sizeProps, props } = getSizeProps(restProps);

  return (
    <Box
      sx={{ ...builderSx, ...generateSize(sizeProps, true) }}
      {...restBuilderWrapperProps}
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
            marginBottom: "10px",
          }}
        >
          <Stack direction="row" alignItems="center" spacing="10px">
            {imgHeader && (
              <Image
                src={imgHeader}
                alt="image"
                width={"30"}
                unitWidth="px"
                height={"40"}
              />
            )}
            {title && (
              <Typography
                variant="h3"
                fontWeight={500}
                fontSize={20}
                sx={{ color: "secondary.main", textTransform: "capitalize" }}
              >
                {title}
              </Typography>
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing="5px"
            sx={{ color: "primary.main" }}
          >
            <Typography
              fontSize={16}
              fontWeight={500}
              sx={{ color: "primary.main" }}
            >
              Xem tất cả
            </Typography>
            <LuArrowRightCircle size={24} />
          </Stack>
        </Stack>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "divider", padding: "10px 0" }}
      >
        <Typography fontSize={18}>CAROUSEL SẢN PHẨM</Typography>
      </Stack>
    </Box>
  );
}
export default CarouselProductBuilder;
