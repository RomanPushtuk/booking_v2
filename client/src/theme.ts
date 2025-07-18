import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";

const themeOverride = createTheme({
  /** Put your mantine theme override here */
});

const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export { theme };
