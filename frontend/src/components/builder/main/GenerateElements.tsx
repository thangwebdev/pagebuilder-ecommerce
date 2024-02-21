import React, { useMemo } from "react";
import { Stack } from "@mui/material";
import RenderComponents from "~/components/ui/RenderComponents";
import { useBuilderContext } from "~/contexts/BuilderProvider";

function GenerateElements() {
  const {
    value: { storePageData, indexPageData },
  } = useBuilderContext();

  const currentPageData = useMemo(() => {
    if (!storePageData) {
      return undefined;
    } else {
      return storePageData[indexPageData || 0];
    }
  }, [storePageData, indexPageData]);

  return (
    <>
      {!!currentPageData && currentPageData.elements.length > 0 && (
        <Stack
          id="render-components"
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <RenderComponents components={currentPageData.elements} isBuilding />
        </Stack>
      )}
    </>
  );
}

export default GenerateElements;
