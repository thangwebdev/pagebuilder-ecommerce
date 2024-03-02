import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export interface IPopupProps {
  children: React.ReactElement<any, any>;
  title?: string;
  width?: string;
  content?: React.ReactNode;
}

function Popup({ children, title, width, content }: IPopupProps) {
  return (
    <Tooltip
      arrow
      title={
        <Paper
          sx={{
            width: width || "400px",
            maxWidth: "80vw",
            minHeight: "20px",
            padding: "10px",
          }}
        >
          {title && (
            <Typography sx={{ textAlign: "center", fontWeight: 500 }}>
              {title}
            </Typography>
          )}
          {content}
        </Paper>
      }
      placement="bottom-end"
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "red",
            padding: 0,
            marginTop: "8px !important",
            maxWidth: "unset",
          },
        },
        arrow: {
          sx: { color: "common.white" },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

export default Popup;
