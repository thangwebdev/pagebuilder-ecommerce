import React, { memo, useEffect, useState } from "react";
import { Box, SelectChangeEvent, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { capitalize, cloneDeep } from "lodash";
import InputSize from "./InputSize";
import {
  disableMarginBottom,
  disableMarginLeft,
  disableMarginRight,
  disableMarginTop,
} from "~/utils/constants";

interface IMarginTabProps {
  element: IBuilderComponentProps;
}
type MarginType = "top" | "bottom" | "left" | "right";

const unitvalues = [
  { label: "px", value: "px" },
  { label: "%", value: "%" },
  { label: "em", value: "em" },
  { label: "rem", value: "rem" },
];

function MarginTab({ element }: IMarginTabProps) {
  const theme = useTheme();
  const {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    unitMarginTop,
    unitMarginBottom,
    unitMarginLeft,
    unitMarginRight,
  } = element.propData;
  const {
    value: { storePageData, indexPageData },
    handleUpdateValues,
    findElementByPath,
  } = useBuilderContext();
  const [units, setUnits] = useState({
    top: unitMarginTop || "px",
    bottom: unitMarginBottom || "px",
    left: unitMarginLeft || "px",
    right: unitMarginRight || "px",
  });

  const [margins, setMargins] = useState({
    top: marginTop || "0",
    bottom: marginBottom || "0",
    left: marginLeft || "0",
    right: marginRight || "0",
  });

  const [load, setLoad] = useState(1);

  const handleMarginChange = (value: string, type: MarginType) => {
    if (value === element.propData[`margin${capitalize(type)}`]) {
      return;
    }

    if (!value || isNaN(Number(value))) {
      value = "0";
    }
    setMargins({ ...margins, [type]: value });
    setLoad(load + 1);
  };

  const handleUnitChange = (value: string, type: MarginType) => {
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

    currentElement.propData.marginTop = margins.top;
    currentElement.propData.marginBottom = margins.bottom;
    currentElement.propData.marginLeft = margins.left;
    currentElement.propData.marginRight = margins.right;

    currentElement.propData.unitMarginTop = units.top;
    currentElement.propData.unitMarginBottom = units.bottom;
    currentElement.propData.unitMarginLeft = units.left;
    currentElement.propData.unitMarginRight = units.right;

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
      top: unitMarginTop || "px",
      bottom: unitMarginBottom || "px",
      left: unitMarginLeft || "px",
      right: unitMarginRight || "px",
    });
    setMargins({
      top: marginTop || "0",
      bottom: marginBottom || "0",
      left: marginLeft || "0",
      right: marginRight || "0",
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
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "4px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 0 2px ${theme.palette.common.white}, 0 0 0 6px ${theme.palette.primary.main}`,
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
            inputValue={margins.top}
            selectValue={units.top}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setMargins({ ...margins, top: value });
            }}
            onInputBlur={() => {
              handleMarginChange(margins.top, "top");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "top");
            }}
            disableInput={disableMarginTop.includes(element.type)}
            disableSelect={disableMarginTop.includes(element.type)}
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
            inputValue={margins.bottom}
            selectValue={units.bottom}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setMargins({ ...margins, bottom: value });
            }}
            onInputBlur={() => {
              handleMarginChange(margins.bottom, "bottom");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "bottom");
            }}
            disableInput={disableMarginBottom.includes(element.type)}
            disableSelect={disableMarginBottom.includes(element.type)}
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
            inputValue={margins.left}
            selectValue={units.left}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setMargins({ ...margins, left: value });
            }}
            onInputBlur={() => {
              handleMarginChange(margins.left, "left");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "left");
            }}
            disableInput={disableMarginLeft.includes(element.type)}
            disableSelect={disableMarginLeft.includes(element.type)}
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
            inputValue={margins.right}
            selectValue={units.right}
            selectOptions={unitvalues}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setMargins({ ...margins, right: value });
            }}
            onInputBlur={() => {
              handleMarginChange(margins.right, "right");
            }}
            onSelectChange={(e: SelectChangeEvent<unknown>) => {
              const value = e.target.value;
              handleUnitChange(value as string, "right");
            }}
            disableInput={disableMarginRight.includes(element.type)}
            disableSelect={disableMarginRight.includes(element.type)}
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default memo(MarginTab);
