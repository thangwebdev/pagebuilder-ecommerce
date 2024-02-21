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
    label: "528px",
    value: "sm",
    breakpoint: 528,
  },
  {
    label: "992px",
    value: "md",
    breakpoint: 992,
  },
  {
    label: "1280px",
    value: "lg",
    breakpoint: 1280,
  },
  {
    label: "1440px",
    value: "xl",
    breakpoint: 1440,
  },
];

// size
export const disableWidth = ["colbase"];

export const disableHeight = ["colbase"];

export const disableUnitWidth = ["image", "colbase"];

export const disableUnitHeight = ["image", "colbase"];

export const disablePaddingTop = ["image"];

export const disablePaddingBottom = ["image"];

export const disablePaddingLeft = ["image", "container"];

export const disablePaddingRight = ["image", "container"];

export const disableMarginLeft = ["container", "image", "colbase"];

export const disableMarginRight = ["container", "image", "colbase"];

export const disableMarginTop = ["image", "colbase"];

export const disableMarginBottom = ["image", "colbase"];
