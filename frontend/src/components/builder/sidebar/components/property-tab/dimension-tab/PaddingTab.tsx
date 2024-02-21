import React, { memo, useEffect, useState } from "react";
import { Box, SelectChangeEvent, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { capitalize, cloneDeep } from "lodash";
import InputSize from "./InputSize";
import {
  disablePaddingBottom,
  disablePaddingLeft,
  disablePaddingRight,
  disablePaddingTop,
} from "~/utils/constants";

interface IPaddingTabProps {
  element: IBuilderComponentProps;
}
type PaddingType = "top" | "bottom" | "left" | "right";

const unitvalues = [
  { label: "px", value: "px" },
  { label: "%", value: "%" },
];

function PaddingTab({ element }: IPaddingTabProps) {
  const theme = useTheme();
  const {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    unitPaddingTop,
    unitPaddingBottom,
    unitPaddingLeft,
    unitPaddingRight,
  } = element.propData;
  const {
    value: { storePageData, indexPageData },
    handleUpdateValues,
    findElementByPath,
  } = useBuilderContext();
  const [units, setUnits] = useState({
    top: unitPaddingTop || "px",
    bottom: unitPaddingBottom || "px",
    left: unitPaddingLeft || "px",
    right: unitPaddingRight || "px",
  });

  const [paddings, setPaddings] = useState({
    top: paddingTop || "10",
    bottom: paddingBottom || "10",
    left: paddingLeft || "10",
    right: paddingRight || "10",
  });

  const [load, setLoad] = useState(1);

  const handlePaddingChange = (value: string, type: PaddingType) => {
    if (value === element.propData[`padding${capitalize(type)}`]) {
      return;
    }

    if (!value || isNaN(Number(value))) {
      value = "0";
    }
    setPaddings({ ...paddings, [type]: value });
    setLoad(load + 1);
  };

  const handleUnitChange = (value: string, type: PaddingType) => {
    setUnits({ ...units, [type]: value });
    setLoad(load + 1);
  };

  const updateElement = () => {
    const pageData = storePageData[indexPageData];
    const pageDataClone = cloneDeep(pageData);
    const currentElement = findElementByPath(
      pageDataClone.elements,
      element.path
    );

    currentElement.propData.paddingTop = paddings.top;
    currentElement.propData.paddingBottom = paddings.bottom;
    currentElement.propData.paddingLeft = paddings.left;
    currentElement.propData.paddingRight = paddings.right;

    currentElement.propData.unitPaddingTop = units.top;
    currentElement.propData.unitPaddingBottom = units.bottom;
    currentElement.propData.unitPaddingLeft = units.left;
    currentElement.propData.unitPaddingRight = units.right;

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
    setUnits({
      top: unitPaddingTop || "px",
      bottom: unitPaddingBottom || "px",
      left: unitPaddingLeft || "px",
      right: unitPaddingRight || "px",
    });
    setPaddings({
      top: paddingTop || "0",
      bottom: paddingBottom || "0",
      left: paddingLeft || "0",
      right: paddingRight || "0",
    });
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
          border: "4px solid",
          borderColor: "primary.main",
          borderRadius: "4px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 0 4px ${theme.palette.common.white}, 0 0 0 5px ${theme.palette.primary.main}`,
        }}
      >
        {/* Top */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={paddings.top}
            selectValue={units.top}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setPaddings({ ...paddings, top: value });
            }}
            onInputBlur={() => {
              handlePaddingChange(paddings.top, "top");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "top");
            }}
            disableInput={disablePaddingTop.includes(element.type)}
            disableSelect={disablePaddingTop.includes(element.type)}
          />
        </Box>
        {/* Bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={paddings.bottom}
            selectValue={units.bottom}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setPaddings({ ...paddings, bottom: value });
            }}
            onInputBlur={() => {
              handlePaddingChange(paddings.bottom, "bottom");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "bottom");
            }}
            disableInput={disablePaddingBottom.includes(element.type)}
            disableSelect={disablePaddingBottom.includes(element.type)}
          />
        </Box>
        {/* Left */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translate(-50%, -50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={paddings.left}
            selectValue={units.left}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setPaddings({ ...paddings, left: value });
            }}
            onInputBlur={() => {
              handlePaddingChange(paddings.left, "left");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "left");
            }}
            disableInput={disablePaddingLeft.includes(element.type)}
            disableSelect={disablePaddingLeft.includes(element.type)}
          />
        </Box>
        {/* Right */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translate(50%, -50%)",
            backgroundColor: "common.white",
          }}
        >
          <InputSize
            placeholder="0"
            inputValue={paddings.right}
            selectValue={units.right}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setPaddings({ ...paddings, right: value });
            }}
            onInputBlur={() => {
              handlePaddingChange(paddings.right, "right");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "right");
            }}
            disableInput={disablePaddingRight.includes(element.type)}
            disableSelect={disablePaddingRight.includes(element.type)}
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default memo(PaddingTab);
