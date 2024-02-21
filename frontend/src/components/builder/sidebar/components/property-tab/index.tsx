import { Stack } from "@mui/material";
import Tabs from "~/components/ui/tabs";
import DimensionTab from "./dimension-tab";
import PropTab from "./prop-tab";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { useMemo } from "react";

function PropertyTabs() {
  const {
    value: { builderActivePath, storePageData, indexPageData },
    findElementByPath,
  } = useBuilderContext();

  const activeElement = useMemo(() => {
    const pageData = storePageData[indexPageData];
    if (!pageData) return null;
    const element = findElementByPath(
      pageData.elements,
      builderActivePath as string
    );
    return element;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderActivePath, storePageData, indexPageData]);

  if (!activeElement) {
    return null;
  }

  return (
    <Stack
      direction="row"
      sx={{
        height: "40px",
      }}
    >
      <Tabs
        tabStyle={{ flexGrow: 1, height: "40px" }}
        labels={[
          { id: 0, label: "Thuộc tính" },
          { id: 1, label: "Tùy chỉnh" },
        ]}
        panels={[
          { id: 0, children: <PropTab element={activeElement} /> },
          { id: 1, children: <DimensionTab element={activeElement} /> },
        ]}
      />
    </Stack>
  );
}
export default PropertyTabs;
