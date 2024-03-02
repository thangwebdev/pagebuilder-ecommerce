import React, { FocusEvent } from "react";
import Stack from "@mui/material/Stack";
import { Box, Typography } from "@mui/material";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { cloneDeep } from "lodash";

function PageName() {
  const {
    value: { storePageData, indexPageData },
    handleUpdateValues,
  } = useBuilderContext();

  const currentPageData = storePageData[indexPageData];

  const handelPageNameChange = (e: FocusEvent) => {
    let value = e.target.textContent;
    if (!value) {
      value = "Page name";
    }
    const pageDataClone = cloneDeep(storePageData[indexPageData]);
    pageDataClone.name = value;

    const newStorePageData = [...storePageData, pageDataClone];

    handleUpdateValues({
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
    });
  };

  return (
    <Stack alignItems="flex-start" sx={{ flex: 1 }}>
      <Stack direction="row" alignItems="center" spacing="5px">
        <Typography sx={{ fontSize: "13px" }}>Tên trang:</Typography>
        <Box sx={{ display: "inline-block" }}>
          <Box
            dangerouslySetInnerHTML={{ __html: currentPageData?.name }}
            component="div"
            contentEditable={true}
            onBlur={handelPageNameChange}
            sx={{
              fontSize: "13px",
              lineHeight: "14px",
              outline: "none",
              border: "2px solid transparent",
              borderRadius: "2px",
              maxWidth: "200px",
              textWrap: "nowrap",
              overflow: "hidden",
              "&:focus": {
                borderColor: "primary.main",
              },
              padding: "2px 4px",
            }}
          ></Box>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="5px">
        <Typography sx={{ fontSize: "13px" }}>Đường dẫn:</Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: currentPageData?.href }}
          component="div"
          sx={{
            fontSize: "13px",
            color: "#888",
            lineHeight: "14px",
            outline: "none",
            border: "2px solid transparent",
            borderRadius: "2px",
            "&:focus": {
              borderColor: "primary.main",
            },
            padding: "2px 4px",
          }}
        ></Box>
      </Stack>
    </Stack>
  );
}

export default PageName;
