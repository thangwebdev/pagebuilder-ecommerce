import {
  IconButton,
  Stack,
  Typography,
  Collapse as MuiCollapse,
  CollapseProps,
} from "@mui/material";
import React, { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";

export interface ICollapseProps extends CollapseProps {}

function Collapse({ children, title, orientation, ...props }: ICollapseProps) {
  const [expand, setExpand] = useState<boolean>(true);

  const handleToggle = () => {
    setExpand(!expand);
  };

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing="5px"
        sx={{ cursor: "pointer" }}
        onClick={handleToggle}
      >
        <IconButton>
          {expand ? <FaCaretDown size={14} /> : <FaCaretRight size={14} />}
        </IconButton>
        <Typography>{title}</Typography>
      </Stack>
      <MuiCollapse in={expand} orientation={orientation} {...props}>
        {children}
      </MuiCollapse>
    </Stack>
  );
}

export default Collapse;
