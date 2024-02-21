import { Box } from "@mui/material";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { memo } from "react";
import RenderInput from "./RenderInput";

function PropTab({ element }: { element: IBuilderComponentProps }) {
  return (
    <Box
      sx={{
        height: "calc(100vh - 50px - 20px - 40px - 40px)",
        padding: "10px",
        overflow: "auto",
      }}
    >
      <RenderInput element={element} />
    </Box>
  );
}

export default memo(PropTab);
