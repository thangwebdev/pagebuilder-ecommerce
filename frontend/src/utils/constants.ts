export const SPLIT_SYMBOL = "_";

export const breakpoints: {
  label: string;
  value: string;
  breakpoint: number;
}[] = [
  {
    label: "0px",
    value: "xs",
    breakpoint: 0,
  },
  {
    label: "600px",
    value: "sm",
    breakpoint: 600,
  },
  {
    label: "900px",
    value: "md",
    breakpoint: 900,
  },
  {
    label: "1200px",
    value: "lg",
    breakpoint: 1200,
  },
  {
    label: "1536px",
    value: "xl",
    breakpoint: 1536,
  },
];

// size
export const disableWidth = ["colbase"];

export const disableHeight = [];

export const disableUnitWidth = ["colbase"];

export const disableUnitHeight = [];

export const disablePaddingTop = ["image"];

export const disablePaddingBottom = ["image"];

export const disablePaddingLeft = ["image", "container"];

export const disablePaddingRight = ["image", "container"];

export const disableMarginLeft = ["container", "colbase"];

export const disableMarginRight = ["container", "colbase"];

export const disableMarginTop = ["colbase"];

export const disableMarginBottom = ["colbase"];
