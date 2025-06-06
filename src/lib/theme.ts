"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    mode: "light",
    // mode: "dark",
    // mode: process.env.NODE_ENV === 'production' ? 'light' : 'dark',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {},
});
