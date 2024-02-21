// generate random string
function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

// order array by another array
function orderArrayByAnotherArray(
  sourceArray: any[],
  orderArray: (string | number)[],
  keyToFind: string
) {
  if (!sourceArray[0] || !sourceArray[0][keyToFind]) return;
  sourceArray.sort((a, b) => {
    return orderArray.indexOf(a[keyToFind]) - orderArray.indexOf(b[keyToFind]);
  });
  return sourceArray;
}

const generateSize = (
  {
    width,
    height,
    unitWidth,
    unitHeight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    unitPaddingTop,
    unitPaddingBottom,
    unitPaddingLeft,
    unitPaddingRight,
    marginTop,
    unitMarginTop,
    marginBottom,
    unitMarginBottom,
    marginLeft,
    unitMarginLeft,
    marginRight,
    unitMarginRight,
  }: {
    width?: string;
    height?: string;
    unitWidth?: string;
    unitHeight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    unitPaddingTop?: string;
    unitPaddingBottom?: string;
    unitPaddingLeft?: string;
    unitPaddingRight?: string;
    marginTop?: string;
    unitMarginTop?: string;
    marginBottom?: string;
    unitMarginBottom?: string;
    marginLeft?: string;
    unitMarginLeft?: string;
    marginRight?: string;
    unitMarginRight?: string;
  },
  isBuilding?: boolean
) => {
  return {
    width: width === "auto" || !unitWidth ? "auto" : `${width}${unitWidth}`,
    height:
      height === "auto" || !unitHeight ? "auto" : `${height}${unitHeight}`,
    paddingTop: !!paddingTop
      ? `${
          +paddingTop >= 10 ? paddingTop : isBuilding ? 10 : paddingTop
        }${unitPaddingTop}`
      : "",
    paddingBottom: !!paddingBottom
      ? `${
          +paddingBottom >= 10 ? paddingBottom : isBuilding ? 10 : paddingBottom
        }${unitPaddingBottom}`
      : "",
    paddingLeft: !!paddingLeft
      ? `${+paddingLeft >= 10 ? paddingLeft : isBuilding ? 10 : paddingLeft}`
      : "",
    paddingRight: !!paddingRight
      ? `${+paddingRight >= 10 ? paddingRight : isBuilding ? 10 : paddingRight}`
      : "",

    marginTop: !!marginTop ? `${marginTop}${unitMarginTop}` : "",
    marginBottom: !!marginBottom ? `${marginBottom}${unitMarginBottom}` : "",
    marginLeft: !!marginLeft ? `${marginLeft}${unitMarginLeft}` : "",
    marginRight: !!marginRight ? `${marginRight}${unitMarginRight}` : "",
  };
};

const getSizeProps = (obj: { [key: string]: any }) => {
  const {
    width = "auto",
    height = "auto",
    unitWidth = "",
    unitHeight = "",
    paddingTop = "",
    unitPaddingTop = "",
    paddingBottom = "",
    unitPaddingBottom = "",
    paddingLeft = "",
    unitPaddingLeft = "",
    paddingRight = "",
    unitPaddingRight = "",
    marginTop = "",
    unitMarginTop = "",
    marginBottom = "",
    unitMarginBottom = "",
    marginLeft = "",
    unitMarginLeft = "",
    marginRight = "",
    unitMarginRight = "",
    path,
    ...props
  } = obj;
  return {
    sizeProps: {
      width,
      height,
      unitWidth,
      unitHeight,
      paddingTop,
      unitPaddingTop,
      paddingBottom,
      unitPaddingBottom,
      paddingLeft,
      unitPaddingLeft,
      paddingRight,
      unitPaddingRight,
      marginTop,
      unitMarginTop,
      marginBottom,
      unitMarginBottom,
      marginLeft,
      unitMarginLeft,
      marginRight,
      unitMarginRight,
    },
    props,
  };
};

export {
  generateRandomString,
  orderArrayByAnotherArray,
  generateSize,
  getSizeProps,
};
