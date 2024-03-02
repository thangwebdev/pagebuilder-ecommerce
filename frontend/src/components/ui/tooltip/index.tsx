import React from "react";
import MuiTooltip, { TooltipProps } from "@mui/material/Tooltip";

export interface ITooltipProps extends TooltipProps {}

function Tooltip({ children, ...props }: ITooltipProps) {
  return (
    <MuiTooltip
      componentsProps={{
        arrow: { sx: { "&:before": { borderTopLeftRadius: "2px" } } },
      }}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
}

export default Tooltip;
