import React from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

import theme from "@/config/darkTheme";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
