import React, { memo, useEffect, useState } from "react";
import { SelectChangeEvent, Stack, Typography } from "@mui/material";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { cloneDeep } from "lodash";
import {
  disableHeight,
  disableUnitHeight,
  disableUnitWidth,
  disableWidth,
} from "~/utils/constants";
import InputSize from "./InputSize";

interface IWidthAndHeightProps {
  element: IBuilderComponentProps;
}

const unitvalues = [
  { label: "-", value: "" },
  { label: "px", value: "px" },
  { label: "%", value: "%" },
  { label: "em", value: "em" },
  { label: "rem", value: "rem" },
  { label: "vh", value: "vh" },
  { label: "vw", value: "vw" },
];

function WidthAndHeightTab({ element }: IWidthAndHeightProps) {
  const { width, height, unitWidth, unitHeight } = element.propData;
  const {
    value: { storePageData, indexPageData },
    handleUpdateValues,
    findElementByPath,
  } = useBuilderContext();
  const [units, setUnits] = useState({
    width: unitWidth || "",
    height: unitHeight || "",
  });

  const [size, setSize] = useState({
    width: width || "auto",
    height: height || "auto",
  });

  const [load, setLoad] = useState(1);

  const handleSizeChange = (value: string, type: "width" | "height") => {
    if (value === element.propData[type]) {
      return;
    }

    if (!value || isNaN(Number(value))) {
      value = "auto";
    }
    if (value !== "auto") {
      if (units[type] === "") setUnits({ ...units, [type]: "px" });
    } else {
      setUnits({ ...units, [type]: "" });
    }
    setSize({ ...size, [type]: value });
    setLoad(load + 1);
  };

  const handleUnitChange = (value: string, type: "width" | "height") => {
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
    currentElement.propData.width = size.width;
    currentElement.propData.height = size.height;
    currentElement.propData.unitWidth = units.width;
    currentElement.propData.unitHeight = units.height;

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
    setSize({ width: width || "auto", height: height || "auto" });
    setUnits({ width: unitWidth || "", height: unitHeight || "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  return (
    <Stack spacing="5px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="5px"
      >
        <Typography sx={{ fontSize: "13px", width: "80px" }}>
          Chiều rộng:
        </Typography>
        <InputSize
          placeholder="auto"
          inputValue={size.width}
          selectValue={units.width}
          selectOptions={unitvalues}
          onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSize({ ...size, width: value });
          }}
          onInputBlur={() => {
            handleSizeChange(size.width, "width");
          }}
          onSelectChange={(e: SelectChangeEvent<unknown>) => {
            const value = e.target.value;
            handleUnitChange(value as string, "width");
          }}
          disableInput={disableWidth.includes(element.type as never)}
          disableSelect={disableUnitWidth.includes(element.type)}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="5px"
      >
        <Typography sx={{ fontSize: "13px", width: "80px" }}>
          Chiều cao:
        </Typography>
        <InputSize
          placeholder="auto"
          inputValue={size.height}
          selectValue={units.height}
          selectOptions={unitvalues}
          onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSize({ ...size, height: value });
          }}
          onInputBlur={() => {
            handleSizeChange(size.height, "height");
          }}
          onSelectChange={(e: SelectChangeEvent<unknown>) => {
            const value = e.target.value;
            handleUnitChange(value as string, "height");
          }}
          disableInput={disableHeight.includes(element.type as never)}
          disableSelect={disableUnitHeight.includes(element.type)}
        />
      </Stack>
    </Stack>
  );
}

export default memo(WidthAndHeightTab);
