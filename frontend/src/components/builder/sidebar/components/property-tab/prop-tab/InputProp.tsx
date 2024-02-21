import { memo, useId, useState } from "react";
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import Input from "~/components/ui/input";
import { BsInfoCircle } from "react-icons/bs";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { cloneDeep } from "lodash";

export interface IInputProp {
  element: IBuilderComponentProps;
  label: string;
  propKey: string;
  description?: string;
  placeholder?: string;
  multiline?: boolean;
  type?: "text" | "number";
}

function InputProp({
  element,
  label,
  propKey,
  description,
  placeholder,
  multiline,
  type,
}: IInputProp) {
  const id = useId();
  const { [propKey]: initValue } = element.propData;
  const {
    value: { storePageData, indexPageData },
    findElementByPath,
    handleUpdateValues,
  } = useBuilderContext();

  const [value, setValue] = useState(initValue || "");

  const handleBlur = () => {
    if (value === element.propData[propKey]) {
      return;
    }

    const pageDataClone = cloneDeep(storePageData[indexPageData]);
    const currentElement = findElementByPath(
      pageDataClone.elements,
      element.path as string
    );
    if (!currentElement) return;
    currentElement.propData[propKey] = value;

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
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              border: "2px solid",
              borderColor: "divider",
              borderRadius: "4px",
              "&:focus-within": {
                borderColor: "primary.main",
              },
            }}
          >
            <Input
              id={id}
              multiline={multiline}
              type={type}
              maxRows={6}
              sx={{
                width: "100%",
                height: multiline ? "" : "30px",
                textAlign: "center",
                "& fieldset": { border: "none" },
              }}
              fontSize="13px"
              placeholder={placeholder}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;
                setValue(newValue);
              }}
              onBlur={handleBlur}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(InputProp);
