import { FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { SiPolywork } from "react-icons/si";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Box, Tooltip } from "@mui/material";
import { IconType } from "react-icons";
import { ViewModeType, useBuilderContext } from "~/contexts/BuilderProvider";

const devices: { icon: IconType; title: string; value: ViewModeType }[] = [
  { icon: RiComputerLine, title: "PC", value: "pc" },
  { icon: FaTabletAlt, title: "Tablet", value: "tablet" },
  { icon: FaMobileAlt, title: "Mobile", value: "mobile" },
];
const activeStyle = {
  borderRadius: "4px",
  backgroundColor: "white",
  color: "primary.main",
  pointerEvents: "none",
};

export default function Devices() {
  const {
    value: { viewMode },
    handleUpdateValue,
  } = useBuilderContext();

  const handleChangeViewMode = (value: ViewModeType) => {
    handleUpdateValue("viewMode", value);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing="5px"
      sx={{
        padding: "5px",
        backgroundColor: "primary.200",
        borderRadius: "4px",
      }}
    >
      <Tooltip arrow placement="bottom" title="Dựng trang">
        <IconButton
          sx={
            viewMode === "builder"
              ? activeStyle
              : {
                  borderRadius: "4px",
                }
          }
          onClick={() => handleChangeViewMode("builder")}
        >
          <SiPolywork size={14} />
        </IconButton>
      </Tooltip>
      <Box
        sx={{ width: "2px", height: "30px", backgroundColor: "grey.100" }}
      ></Box>
      {devices.map((device) => (
        <Tooltip
          key={device.value}
          arrow
          placement="bottom"
          title={device.title}
        >
          <IconButton
            sx={
              viewMode === device.value
                ? activeStyle
                : {
                    borderRadius: "4px",
                  }
            }
            onClick={() => handleChangeViewMode(device.value)}
          >
            <device.icon size={14} />
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}
