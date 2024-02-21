"use client";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { IoCaretDownOutline } from "react-icons/io5";
import Typography from "~/components/ui/typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import { GroupElementType } from "~/utils/elements";
import Element from "./Element";

interface IGroupElementProps {
  group?: GroupElementType;
}

function GroupElement({ group }: IGroupElementProps) {
  const [open, setOpen] = useState<boolean>(true);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      <Stack
        direction="row"
        spacing="5px"
        alignItems="center"
        sx={{ marginBottom: "5px" }}
      >
        <IconButton
          onClick={handleToggleOpen}
          sx={{
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IoCaretDownOutline size={13} />
        </IconButton>
        <Typography sx={{ fontSize: "13px" }}>{group?.title}</Typography>
      </Stack>
      <Collapse in={open}>
        <Box>
          <Grid container spacing="5px">
            {!!group?.elements &&
              group?.elements.map((el) => (
                <Grid key={el.id} item xs={1.5}>
                  <Element data={el} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Collapse>
    </Stack>
  );
}

export default GroupElement;
