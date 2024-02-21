"use client";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { breakpoints } from "~/utils/constants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#68BC6B",
      "100": "#68BC6B11",
      "200": "#68BC6B22",
      "300": "#68BC6B33",
    },
    secondary: {
      main: "#1B3483",
      "100": "#1B348311",
      "200": "#1B348322",
      "300": "#1B348333",
    },
    text: {
      primary: "#2d2d2d",
    },
    divider: "#ededed",
    common: {
      black: "#333",
      white: "#fff",
    },
    info: {
      main: "#4CB9E7",
    },
    error: {
      main: "#BE3144",
    },
    success: {
      main: "#65B741",
    },
    warning: {
      main: "#F6D776",
    },
    grey: { "100": "#bdbdbd" },
  },
  typography: {
    button: {
      fontSize: "14px",
      textTransform: "none",
      fontWeight: "400",
      lineHeight: "14px",
    },
    fontFamily: "inherit",
    h1: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "22px",
      fontWeight: 500,
    },
    h3: {
      fontSize: "20px",
      fontWeight: 400,
    },
    h4: {
      fontSize: "18px",
      fontWeight: 400,
    },
    h5: {
      fontSize: "16px",
      fontWeight: 400,
    },
    h6: {
      fontSize: "14px",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "13px",
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: breakpoints.reduce((acc: any, item) => {
      acc[item.value] = item.breakpoint;
      return acc;
    }, {}),
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          minWidth: "100%",
          height: "40px",
          borderRadius: "20px",
        },
        inputRoot: {
          height: "40px",
          padding: "0px 5px",
        },
        option: {
          fontSize: "14px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: "body1",
      },
      styleOverrides: {
        body1: { fontSize: "14px" },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "0 4px 4px 0 #bdbdbd",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "5px 10px",
          fontSize: "14px",
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
