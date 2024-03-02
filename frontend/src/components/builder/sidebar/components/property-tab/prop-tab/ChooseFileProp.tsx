import React, { ChangeEvent, useEffect, useId, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BsInfoCircle } from "react-icons/bs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import Tooltip from "~/components/ui/tooltip";
import { useBuilderContext } from "~/contexts/BuilderProvider";

export interface IChooseFileProp {
  propKey: string;
  label?: string;
  description?: string;
  accept?: string;
  element: IBuilderComponentProps;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ChooseFileProp({
  propKey,
  label,
  description,
  accept,
  element,
}: IChooseFileProp) {
  const id = useId();
  const { [propKey]: initValue } = element.propData;
  const { handleUpdateElement } = useBuilderContext();
  const [url, setUrl] = useState<string>(initValue);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const currentUrl = URL.createObjectURL(files[0]);
    setUrl(currentUrl);
  };

  useEffect(() => {
    if (url) {
      handleUpdateElement({
        path: element.path,
        objectUpdate: { [propKey]: url },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <Box
      sx={{
        "&:hover": {
          "& .info": {
            opacity: 1,
          },
        },
      }}
    >
      <Grid container spacing="5px">
        <Grid item xs={4.5}>
          <Stack
            direction="row"
            spacing="4px"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Typography
              sx={{ fontSize: "13px" }}
              component="label"
              htmlFor={id}
            >
              {label}:
            </Typography>
            {description && (
              <Tooltip arrow placement="top" title={description}>
                <Stack
                  className="info"
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    color: "info.main",
                    opacity: 0,
                    transition: "all 0.1s linear",
                  }}
                >
                  <BsInfoCircle size={14} />
                </Stack>
              </Tooltip>
            )}
          </Stack>
        </Grid>
        <Grid item xs={7.5}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: "100%",
              border: "2px solid",
              borderColor: "divider",
              borderRadius: "4px",
              "&:focus-within": {
                borderColor: "primary.main",
              },
            }}
          >
            <Tooltip arrow placement="top" title={url ? url : undefined}>
              <Button
                component="label"
                role={undefined}
                variant="text"
                tabIndex={-1}
                sx={{ width: "100%", color: "common.black" }}
                startIcon={<FaCloudUploadAlt />}
              >
                Chọn ảnh
                <VisuallyHiddenInput
                  id={id}
                  accept={accept}
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChooseFileProp;
