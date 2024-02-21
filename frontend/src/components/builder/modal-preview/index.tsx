import { Box } from "@mui/material";
import { useMemo } from "react";
import ModalBase from "~/components/common/modalbase";
import RenderComponents from "~/components/ui/RenderComponents";
import { useBuilderContext } from "~/contexts/BuilderProvider";

function ModalPreview() {
  const {
    value: { openPreview, storePageData, indexPageData },
    handleUpdateValue,
  } = useBuilderContext();

  const currentPageData = useMemo(() => {
    if (!storePageData) {
      return undefined;
    } else {
      return storePageData[indexPageData || 0];
    }
  }, [storePageData, indexPageData]);

  return (
    <ModalBase
      title="Xem Trước"
      open={openPreview}
      onClose={() => handleUpdateValue("openPreview", false)}
    >
      <Box
        sx={{
          width: "98vw",
          maxWidth: "1440px",
          height: "80vh",
          overflow: "auto",
        }}
      >
        <Box sx={{ padding: "0 10px", pointerEvents: "none" }}>
          {!!currentPageData && (
            <RenderComponents
              components={currentPageData.elements}
              isBuilding={false}
            />
          )}
        </Box>
      </Box>
    </ModalBase>
  );
}
export default ModalPreview;
