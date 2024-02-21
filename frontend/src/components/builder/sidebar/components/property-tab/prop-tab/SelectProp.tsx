import {
  Box,
  Grid,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import Select from "~/components/ui/select";
import { useBuilderContext } from "~/contexts/BuilderProvider";

export interface ISelectPropProps {
  label?: string;
  description?: string;
  selectOptions: { label: string; value: string }[];
  defaultValue?: string;
  element: IBuilderComponentProps;
  propKey: string;
}

function SelectProp({
  element,
  propKey,
  label,
  description,
  selectOptions,
  defaultValue,
}: ISelectPropProps) {
  const {
    value: { storePageData, indexPageData },
    findElementByPath,
    handleUpdateValues,
  } = useBuilderContext();
  const [selected, setSelected] = useState(
    element.propData[propKey] || defaultValue
  );

  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    const newValue = e.target.value;

    if (newValue === element.propData[propKey]) {
      return;
    }

    const pageDataClone = cloneDeep(storePageData[indexPageData]);
    const currentElement = findElementByPath(
      pageDataClone.elements,
      element.path as string
    );
    if (!currentElement) return;
    currentElement.propData[propKey] = newValue;

    const newStorePageData = [...storePageData, pageDataClone];

    setSelected(newValue);
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
            <Typography sx={{ fontSize: "13px" }} component="label">
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
            <Select
              wrapperStyle={{ width: "100%", height: "30px" }}
              sx={{
                width: "100%",
                borderRadius: "0px",
                borderLeft: "1px solid",
                borderColor: "divider",
                flex: 1,
                "& .MuiInputBase-root": { width: "100%" },
                "& .MuiSelect-select": {
                  width: "100%",
                  height: "100%",
                  padding: "0px !important",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& fieldset": { border: "none" },
              }}
              options={selectOptions}
              value={selected}
              onChange={handleSelectChange}
              displayEmpty
              fontSize="12px"
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
export default SelectProp;
