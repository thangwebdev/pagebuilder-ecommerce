import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import InputSize from "./InputSize";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { cloneDeep } from "lodash";

type RadiusType =
  | "borderTopLeftRadius"
  | "borderTopRightRadius"
  | "borderBottomRightRadius"
  | "borderBottomLeftRadius";

interface IBorderRadiusTabProps {
  element: IBuilderComponentProps;
}

function BorderRadiusTab({ element }: IBorderRadiusTabProps) {
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  } = element.propData;
  const {
    value: { storePageData, indexPageData },
    findElementByPath,
    handleUpdateValues,
  } = useBuilderContext();
  const [radius, setRadius] = useState({
    borderTopLeftRadius: borderTopLeftRadius || "0",
    borderTopRightRadius: borderTopRightRadius || "0",
    borderBottomRightRadius: borderBottomRightRadius || "0",
    borderBottomLeftRadius: borderBottomLeftRadius || "0",
    general: "0",
  });
  const [load, setLoad] = useState(0);

  const handleRadiusChange = (value: string, type: RadiusType) => {
    if (value === element.propData[type]) {
      return;
    }

    if (!value || isNaN(Number(value))) {
      value = "0";
    }
    setRadius({ ...radius, [type]: value });
    setLoad(load + 1);
  };

  const handleGeneralChange = () => {
    let value = radius.general;
    if (!value || isNaN(Number(value))) {
      value = "0";
    }
    setRadius({
      general: value,
      borderTopLeftRadius: value,
      borderTopRightRadius: value,
      borderBottomLeftRadius: value,
      borderBottomRightRadius: value,
    });
    setLoad(load + 1);
  };

  const updateElement = () => {
    const pageData = storePageData[indexPageData];
    const pageDataClone = cloneDeep(pageData);
    const currentElement = findElementByPath(
      pageDataClone.elements,
      element.path
    );

    currentElement.propData.borderTopLeftRadius = radius.borderTopLeftRadius;
    currentElement.propData.borderTopRightRadius = radius.borderTopRightRadius;
    currentElement.propData.borderBottomRightRadius =
      radius.borderBottomRightRadius;
    currentElement.propData.borderBottomLeftRadius =
      radius.borderBottomLeftRadius;

    const newStorePageData = [...storePageData, pageDataClone];
    handleUpdateValues({
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
    });
  };

  useEffect(() => {
    updateElement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  useEffect(() => {
    if (element) {
      let general = "0";
      if (
        borderTopLeftRadius === borderTopRightRadius &&
        borderTopRightRadius === borderBottomRightRadius &&
        borderBottomRightRadius === borderBottomLeftRadius
      ) {
        general = borderTopLeftRadius;
      }

      setRadius({
        borderTopLeftRadius: borderTopLeftRadius || "0",
        borderTopRightRadius: borderTopRightRadius || "0",
        borderBottomRightRadius: borderBottomRightRadius || "0",
        borderBottomLeftRadius: borderBottomLeftRadius || "0",
        general: general || "0",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  return (
    <Stack
      spacing="5px"
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "20px 0" }}
    >
      <Box
        sx={{
          width: "150px",
          height: "80px",
          border: "2px solid",
          borderColor: "primary.main",
          borderRadius: "4px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Top Left */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-50%, -50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={radius.borderTopLeftRadius}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setRadius({ ...radius, borderTopLeftRadius: value });
            }}
            onInputBlur={() => {
              handleRadiusChange(
                radius.borderTopLeftRadius,
                "borderTopLeftRadius"
              );
            }}
            selectValue="px"
            selectOptions={[{ label: "px", value: "px" }]}
            onSelectChange={() => {}}
            disableSelect
          />
        </Box>

        {/* Top Right */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            transform: "translate(50%, -50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={radius.borderTopRightRadius}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setRadius({ ...radius, borderTopRightRadius: value });
            }}
            onInputBlur={() => {
              handleRadiusChange(
                radius.borderTopRightRadius,
                "borderTopRightRadius"
              );
            }}
            selectValue="px"
            selectOptions={[{ label: "px", value: "px" }]}
            onSelectChange={() => {}}
            disableSelect
          />
        </Box>

        {/* Bottom Right */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            transform: "translate(50%, 50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={radius.borderBottomRightRadius}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setRadius({ ...radius, borderBottomRightRadius: value });
            }}
            onInputBlur={() => {
              handleRadiusChange(
                radius.borderBottomRightRadius,
                "borderBottomRightRadius"
              );
            }}
            selectValue="px"
            selectOptions={[{ label: "px", value: "px" }]}
            onSelectChange={() => {}}
            disableSelect
          />
        </Box>

        {/* Bottom Left */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            transform: "translate(-50%, 50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={radius.borderBottomLeftRadius}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setRadius({ ...radius, borderBottomLeftRadius: value });
            }}
            onInputBlur={() => {
              handleRadiusChange(
                radius.borderBottomLeftRadius,
                "borderBottomLeftRadius"
              );
            }}
            selectValue="px"
            selectOptions={[{ label: "px", value: "px" }]}
            onSelectChange={() => {}}
            disableSelect
          />
        </Box>

        {/* General */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={radius.general}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setRadius({ ...radius, general: value });
            }}
            onInputBlur={handleGeneralChange}
            selectValue="px"
            selectOptions={[{ label: "px", value: "px" }]}
            onSelectChange={() => {}}
            disableSelect
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default BorderRadiusTab;
