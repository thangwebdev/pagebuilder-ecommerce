import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { RxValueNone } from "react-icons/rx";
import Tooltip from "~/components/ui/tooltip";
import { useBuilderContext } from "~/contexts/BuilderProvider";

interface IColorTabProps {
  element: IBuilderComponentProps;
}

function ColorTab({ element }: IColorTabProps) {
  const theme = useTheme();
  const { textColor, backgroundColor } = element.propData;
  const { handleUpdateElement } = useBuilderContext();

  // handle change color
  const handleChangeColor = (key: string, value: string): void => {
    handleUpdateElement({
      path: element.path,
      objectUpdate: { [key]: value },
    });
  };

  const colors: string[] = useMemo(() => {
    const palette = theme.palette;
    return [
      palette.primary.main,
      palette.secondary.main,
      palette.info.main,
      palette.error.main,
      palette.warning.main,
    ];
  }, [theme]);

  return (
    <Stack spacing="10px" sx={{ padding: "10px 0" }}>
      <Stack>
        <Typography sx={{ color: "13px", marginBottom: "5px" }}>
          Màu chữ
        </Typography>
        <Stack direction="row" rowGap="10px" columnGap="10px" flexWrap="wrap">
          <Tooltip title="Mặc định" arrow placement="bottom">
            <Box
              sx={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                borderRadius: "4px",
                backgroundColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all linear 0.1s",
                color: "common.black",
                boxShadow: !textColor
                  ? "0 0 0 2px #fff, 0 0 0 4px currentColor"
                  : "none",
                "&:hover": {
                  filter: "brightness(95%)",
                },
              }}
              onClick={() => handleChangeColor("textColor", "")}
            >
              <RxValueNone size={14} />
            </Box>
          </Tooltip>
          {colors.map((color) => (
            <Tooltip key={color} title={color} arrow placement="bottom">
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: color,
                  cursor: "pointer",
                  borderRadius: "4px",
                  color: "common.black",
                  boxShadow:
                    textColor === color.slice(1)
                      ? "0 0 0 2px #fff, 0 0 0 4px currentColor"
                      : "none",
                  transition: "all linear 0.1s",
                  "&:hover": {
                    filter: "brightness(95%)",
                  },
                }}
                onClick={() => handleChangeColor("textColor", color.slice(1))}
              ></Box>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Typography sx={{ color: "13px", marginBottom: "5px" }}>
          Màu nền
        </Typography>
        <Stack direction="row" rowGap="10px" columnGap="10px" flexWrap="wrap">
          <Tooltip title="Mặc định" arrow placement="bottom">
            <Box
              sx={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                borderRadius: "4px",
                backgroundColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all linear 0.1s",
                color: "common.black",
                boxShadow: !backgroundColor
                  ? "0 0 0 2px #fff, 0 0 0 4px currentColor"
                  : "none",
                "&:hover": {
                  filter: "brightness(95%)",
                },
              }}
              onClick={() => handleChangeColor("backgroundColor", "")}
            >
              <RxValueNone size={14} />
            </Box>
          </Tooltip>
          {colors.map((color) => (
            <Tooltip key={color} title={color} arrow placement="bottom">
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: color,
                  cursor: "pointer",
                  borderRadius: "4px",
                  color: "common.black",
                  boxShadow:
                    backgroundColor === color.slice(1)
                      ? "0 0 0 2px #fff, 0 0 0 4px currentColor"
                      : "none",
                  transition: "all linear 0.1s",
                  "&:hover": {
                    filter: "brightness(95%)",
                  },
                }}
                onClick={() =>
                  handleChangeColor("backgroundColor", color.slice(1))
                }
              ></Box>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ColorTab;
