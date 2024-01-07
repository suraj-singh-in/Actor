import { theme as defaultTheme, type ThemeConfig } from "antd";

const theme: ThemeConfig = {
  algorithm: [defaultTheme.darkAlgorithm],
  token: {
    colorPrimary: "#9eff00",
    colorInfo: "#9eff00",
    colorSuccess: "#b1ff33",
    colorWarning: "#c5ff66",
    colorError: "#a96063",
    colorBgBase: "#191919",
    fontSize: 16,
    borderRadius: 12,
  },
};

export default theme;
