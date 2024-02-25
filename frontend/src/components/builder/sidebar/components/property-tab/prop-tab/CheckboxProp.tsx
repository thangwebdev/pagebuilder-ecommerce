import { Box, Checkbox, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { cloneDeep } from "lodash";
import React, { useId } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { useBuilderContext } from "~/contexts/BuilderProvider";

export interface ICheckboxPropProps {
  element: IBuilderComponentProps;
  label: string;
  propKey: string;
  description?: string;
}

function CheckboxProp({
  element,
  label,
  propKey,
  description,
}: ICheckboxPropProps) {
  const id = useId();
  const { [propKey]: initValue = false } = element.propData;
  const {
    value: { storePageData, indexPageData },
    findElementByPath,
    handleUpdateValues,
  } = useBuilderContext();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const pageDataClone = cloneDeep(storePageData[indexPageData]);
    const currentElement = findElementByPath(
      pageDataClone.elements,
      element.path as string
    );
    if (!currentElement) return;
    currentElement.propData[propKey] = checked;

    const newStorePageData = [...storePageData, pageDataClone];
    handleUpdateValues({
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
    });
  };

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
          <Checkbox checked={initValue} onChange={handleValueChange} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckboxProp;
