import { Box, Divider } from "@mui/material";
import Collapse from "~/components/ui/collapse";
import WidthAndHeightTab from "./WidthAndHeightTab";
import PaddingTab from "./PaddingTab";
import MarginTab from "./MarginTab";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import BorderRadiusTab from "./BorderRadiusTab";

function DimensionTab({ element }: { element: IBuilderComponentProps }) {
  return (
    <Box
      sx={{
        height: "calc(100vh - 50px - 10px - 40px - 40px)",
        padding: "5px",
        overflow: "auto",
      }}
    >
      <Collapse title="Kích thước">
        <Box sx={{ padding: "0px 5px 5px 5px" }}>
          <WidthAndHeightTab element={element} />
        </Box>
      </Collapse>
      <Divider />
      <Collapse title="Bo góc">
        <Box sx={{ padding: "0px 5px 5px 5px" }}>
          <BorderRadiusTab element={element} />
        </Box>
      </Collapse>
      <Divider />
      <Collapse title="Phần đệm">
        <Box sx={{ padding: "0px 5px 5px 5px" }}>
          <PaddingTab element={element} />
        </Box>
      </Collapse>
      <Divider />
      <Collapse title="Khoảng cách">
        <Box sx={{ padding: "0px 5px 5px 5px" }}>
          <MarginTab element={element} />
        </Box>
      </Collapse>
    </Box>
  );
}

export default DimensionTab;
