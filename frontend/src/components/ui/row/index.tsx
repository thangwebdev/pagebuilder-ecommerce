"use client";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { Stack, StackProps, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { IDimension } from "~/types";
import { generateSize, getSizeProps } from "~/utils/helpers";

const RenderComponents = dynamic(() => import("../RenderComponents"));

const defaultColumns = 4;

type omitType =
  | "width"
  | "height"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop";

export interface IRowProps extends Omit<StackProps, omitType>, IDimension {
  components?: any[];
  isBuilding?: boolean;
  xsColumns: number;
  smColumns?: number;
  mdColumns?: number;
  lgColumns?: number;
  xlColumns?: number;
  columnGap?: number;
  rowGap?: number;
}

function Row(
  {
    children,
    components,
    sx,
    spacing,
    rowGap,
    columnGap,
    direction,
    alignItems,
    justifyContent,
    xsColumns,
    smColumns,
    mdColumns,
    lgColumns,
    xlColumns,
    isBuilding,
    ...restProps
  }: IRowProps,
  ref: ForwardedRef<any> | undefined
) {
  const theme = useTheme();
  const xsMatch = useMediaQuery(theme.breakpoints.up("xs"));
  const smMatch = useMediaQuery(theme.breakpoints.up("sm"));
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatch = useMediaQuery(theme.breakpoints.up("lg"));
  const xlMatch = useMediaQuery(theme.breakpoints.up("xl"));

  const { sizeProps, props } = getSizeProps(restProps);

  const columnWidth = useMemo(() => {
    let column = defaultColumns;
    if (xlMatch) {
      column =
        xlColumns ||
        lgColumns ||
        mdColumns ||
        smColumns ||
        xsColumns ||
        defaultColumns;
    } else if (lgMatch) {
      column =
        lgColumns || mdColumns || smColumns || xsColumns || defaultColumns;
    } else if (mdMatch) {
      column = mdColumns || smColumns || xsColumns || defaultColumns;
    } else if (smMatch) {
      column = smColumns || xsColumns || defaultColumns;
    } else if (xsMatch) {
      column = xsColumns || defaultColumns;
    } else {
      column = defaultColumns;
    }
    return `calc(calc(100% - ${
      (column - 1) * (columnGap || 0)
    }px) / ${column})`;
  }, [
    xsMatch,
    smMatch,
    mdMatch,
    lgMatch,
    xlMatch,
    xsColumns,
    smColumns,
    mdColumns,
    lgColumns,
    xlColumns,
    columnGap,
  ]);

  return (
    <Stack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      rowGap={!!rowGap ? `${rowGap}px` : ""}
      columnGap={!!columnGap ? `${columnGap}px` : ""}
      sx={{
        flexWrap: "wrap",
        "& .colbase": {
          flexBasis: columnWidth,
          maxWidth: columnWidth,
        },
        ...sx,
        ...generateSize(sizeProps, isBuilding),
      }}
      ref={ref}
      {...props}
    >
      {children}
      <RenderComponents components={components} />
    </Stack>
  );
}
export default forwardRef(Row);
