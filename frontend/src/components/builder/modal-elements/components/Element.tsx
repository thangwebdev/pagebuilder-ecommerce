import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { cloneDeep } from "lodash";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { ElementType } from "~/utils/elements";
import { generateRandomString } from "~/utils/helpers";
import { SPLIT_SYMBOL } from "~/utils/constants";
import { IBuilderComponentProps } from "~/components/ui/builder-component";

function Element({ data }: { data: ElementType }) {
  const {
    value: { storePageData, indexPageData, pathWillAdd, builderActivePath },
    handleUpdateValues,
    findElementByPath,
  } = useBuilderContext();

  const handleSelect = () => {
    const dataClone = cloneDeep(data);
    const pageDataClone = cloneDeep(storePageData[indexPageData]);
    const randomId = `el${generateRandomString(8)}`;

    const path = !!pathWillAdd
      ? `${pathWillAdd}${SPLIT_SYMBOL}${randomId}`
      : randomId;

    if (dataClone.generateComponents) {
      dataClone.generateComponents(path);
    }

    const newElement: IBuilderComponentProps = {
      uniqueId: randomId,
      propData: dataClone.defaultProps,
      type: dataClone.id,
      path,
    };
    if (pathWillAdd) {
      const currentElement = findElementByPath(
        pageDataClone.elements,
        pathWillAdd
      );
      currentElement.propData.components?.push(newElement);

      const newStorePageData = [...storePageData, pageDataClone];

      handleUpdateValues({
        openModal: false,
        storePageData: newStorePageData,
        indexPageData: newStorePageData.length - 1,
      });
    } else {
      pageDataClone.elements.push(newElement);
      const newStorePageData = [...storePageData, pageDataClone];
      handleUpdateValues({
        openModal: false,
        storePageData: newStorePageData,
        indexPageData: newStorePageData.length - 1,
        pathWillAdd: builderActivePath,
      });
    }
  };

  return (
    <Box
      onClick={handleSelect}
      sx={{
        width: "100%",
        paddingTop: "100%",
        backgroundColor: "divider",
        borderRadius: "4px",
        position: "relative",
        transition: "all linear 0.02s",
        cursor: "pointer",
        userSelect: "none",
        "&:hover": {
          backgroundColor: "primary.100",
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ color: "primary.main" }}>
          <data.icon size={24} />
        </Box>
        <Typography sx={{ fontSize: "12px" }}>{data.name}</Typography>
      </Stack>
    </Box>
  );
}

export default Element;
