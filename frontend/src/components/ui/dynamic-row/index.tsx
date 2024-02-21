"use client";
import { ForwardedRef, forwardRef } from "react";
import { Stack, StackProps, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IDimension } from "~/types";
import { generateSize, getSizeProps } from "~/utils/helpers";
import dynamic from "next/dynamic";

const RenderComponents = dynamic(() => import("../RenderComponents"));

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

export interface IDynamicRowProps
  extends Omit<StackProps, omitType>,
    IDimension {
  components?: any[];
  isBuilding?: boolean;
  columnGap?: number;
  rowGap?: number;
}

function DynamicRow(
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
    isBuilding,
    ...restProps
  }: IDynamicRowProps,
  ref: ForwardedRef<any> | undefined
) {
  const { sizeProps, props } = getSizeProps(restProps);
  const theme = useTheme();
  const smMatch = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      rowGap={!!rowGap ? `${rowGap}px` : ""}
      columnGap={!!columnGap ? `${columnGap}px` : ""}
      sx={
        smMatch
          ? {
              ...sx,
              ...generateSize(sizeProps, isBuilding),
            }
          : {
              flexWrap: "wrap",
              "& .colbase": {
                flexBasis: "100%",
                maxWidth: "100%",
              },
              ...sx,
              ...generateSize(sizeProps, isBuilding),
            }
      }
      ref={ref}
      {...props}
    >
      {children}
      <RenderComponents components={components} />
    </Stack>
  );
}
export default forwardRef(DynamicRow);
