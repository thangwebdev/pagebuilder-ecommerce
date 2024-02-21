import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { ForwardedRef, forwardRef } from "react";
import { IDimension } from "~/types";
import { generateSize, getSizeProps } from "~/utils/helpers";

type omitType =
  | "width"
  | "height"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom";

export interface ITypographyProps
  extends Omit<TypographyProps, omitType>,
    IDimension {
  isBuilding?: boolean;
}

function Typography(
  {
    sx,
    lineHeight,
    fontSize,
    fontWeight,
    variant,
    textAlign,
    isBuilding,
    ...restProps
  }: ITypographyProps,
  ref: ForwardedRef<any> | undefined
) {
  const { sizeProps, props } = getSizeProps(restProps);

  return (
    <MuiTypography
      ref={ref}
      variant={variant}
      sx={{
        ...sx,
        ...generateSize(sizeProps, isBuilding),
        lineHeight,
        fontSize: fontSize ? `${fontSize}px` : undefined,
        fontWeight: fontWeight,
        textAlign: textAlign,
      }}
      {...props}
    />
  );
}

export default forwardRef(Typography);
