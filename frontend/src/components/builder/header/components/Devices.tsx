import { FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

export default function Devices() {
  // handle mobile view
  const handleMobileView = () => {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]');
    if (viewportMetaTag) {
      // Thiết lập thuộc tính content để mô phỏng một thiết bị di động
      viewportMetaTag.setAttribute("content", "width=1500, initial-scale=1.0");
    } else {
      console.error('Không tìm thấy meta tag "viewport" trong mã HTML.');
    }
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
      <IconButton
        sx={{
          borderRadius: "4px",
          backgroundColor: "white",
          color: "primary.main",
        }}
      >
        <RiComputerLine size={14} />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: "4px",
        }}
      >
        <MdComputer size={14} />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: "4px",
        }}
      >
        <FaTabletAlt size={14} />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: "4px",
        }}
        onClick={handleMobileView}
      >
        <FaMobileAlt size={14} />
      </IconButton>
    </Stack>
  );
}
