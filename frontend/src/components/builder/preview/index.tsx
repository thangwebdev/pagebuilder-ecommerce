import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { FaRegEye } from "react-icons/fa";
import { ViewModeType, useBuilderContext } from "~/contexts/BuilderProvider";

const devices: Record<Exclude<ViewModeType, "builder">, string> = {
  pc: "100%",
  tablet: "1024px",
  mobile: "375px",
};

export default function Preview() {
  const {
    value: { viewMode, storePageData, indexPageData },
  } = useBuilderContext();

  const currentPageData = useMemo(() => {
    if (!storePageData) {
      return undefined;
    } else {
      return storePageData[indexPageData || 0];
    }
  }, [storePageData, indexPageData]);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100%",
        padding: "0 10px",
        position: "relative",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing="5px"
        sx={{
          position: "absolute",
          zIndex: 10,
          top: "10px",
          left: "10px",
          backgroundColor: "common.black",
          padding: "5px 10px",
          borderRadius: "4px",
          color: "common.white",
        }}
      >
        <FaRegEye />
        <Typography>Chế độ xem trước</Typography>
      </Stack>
      <Box
        sx={{
          width: viewMode !== "builder" ? devices[viewMode] : "100%",
          height: "100%",
          position: "relative",
          transition: "all linear 0.1s",
          pointerEvents: "none",
        }}
      >
        <iframe
          src={`${window.origin}/preview?data=${JSON.stringify(
            currentPageData?.elements || []
          )}`}
          frameBorder="0"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </Box>
    </Stack>
  );
}
