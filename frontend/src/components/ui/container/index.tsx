import React, { ForwardedRef, forwardRef } from "react";
import MuiContainer, { ContainerProps } from "@mui/material/Container";
import dynamic from "next/dynamic";
import { IDimension } from "~/types";
import { generateSize, getSizeProps } from "~/utils/helpers";

const RenderComponents = dynamic(() => import("../RenderComponents"));

export interface IContainerProps extends ContainerProps, IDimension {
  components?: any[];
  orderIds?: string[];
  isBuilding?: boolean;
}

function Container(
  {
    children,
    components,
    orderIds,
    maxWidth,
    sx,
    isBuilding,
    ...restProps
  }: IContainerProps,
  ref: ForwardedRef<any> | undefined
) {
  const {
    sizeProps: {
      paddingLeft,
      unitPaddingLeft,
      paddingRight,
      unitPaddingRight,
      marginLeft,
      unitMarginLeft,
      marginRight,
      unitMarginRight,
      ...sizes
    },
    props,
  } = getSizeProps(restProps);

  return (
    <MuiContainer
      ref={ref}
      sx={{
        ...sx,
        ...generateSize(sizes, isBuilding),
      }}
      {...props}
      maxWidth={maxWidth}
    >
      {children}
      <RenderComponents components={components} />
    </MuiContainer>
  );
}
export default forwardRef(Container);
