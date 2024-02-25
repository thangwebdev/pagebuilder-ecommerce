import { Grid, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { elementProps } from "~/utils/elementProps";
import InputProp, { IInputProp } from "./InputProp";
import SelectProp, { ISelectPropProps } from "./SelectProp";
import { IBuilderComponentProps } from "~/components/ui/builder-component";
import CheckboxProp, { ICheckboxPropProps } from "./CheckboxProp";

function RenderInput({ element }: { element: IBuilderComponentProps }) {
  const elementProp = useMemo(() => {
    return elementProps[element.type];
  }, [element.type]);

  return (
    <>
      {elementProp ? (
        <Grid container spacing="10px">
          {elementProp.map((el, index) => {
            return (
              <Grid key={`${element.path}${index}`} item xs={12} {...el.col}>
                {el.type === "input" && (
                  <InputProp {...(el.props as IInputProp)} element={element} />
                )}
                {el.type === "select" && (
                  <SelectProp
                    {...(el.props as ISelectPropProps)}
                    element={element}
                  />
                )}
                {el.type === "checkbox" && (
                  <CheckboxProp
                    {...(el.props as ICheckboxPropProps)}
                    element={element}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography
          sx={{ fontSize: "13px", fontStyle: "italic", textAlign: "center" }}
        >
          Phần tử không có thuộc tính
        </Typography>
      )}
    </>
  );
}

export default memo(RenderInput);
