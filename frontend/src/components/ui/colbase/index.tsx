import { ForwardedRef, forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import dynamic from "next/dynamic";
import { IDimension } from "~/types";
import { generateSize, getSizeProps } from "~/utils/helpers";

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

export interface IColBaseProps extends Omit<BoxProps, omitType>, IDimension {
  components?: any[];
  direction?: "row" | "column";
  spacing?: string;
  isBuilding?: boolean;
}

function ColBase(
  {
    children,
    components,
    sx,
    direction,
    spacing,
    justifyContent,
    alignItems,
    isBuilding,
    ...restProps
  }: IColBaseProps,
  ref: ForwardedRef<any> | undefined
) {
  const { sizeProps, props } = getSizeProps(restProps);

  return (
    <Box
      className="colbase"
      sx={{
        flex: !!sizeProps.width && sizeProps.width !== "auto" ? "unset" : 1,
        display: "flex",
        justifyContent: justifyContent,
        alignItems: alignItems,
        ...sx,
        ...generateSize(sizeProps, isBuilding),
        flexDirection: direction,
        gap: !!spacing ? `${spacing}px` : undefined,
      }}
      {...props}
      ref={ref}
    >
      {children}
      <RenderComponents components={components} />
    </Box>
  );
}
export default forwardRef(ColBase);
