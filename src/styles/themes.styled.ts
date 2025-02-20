import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: { 
      [key: string]: string;
    }
  }
}

export type Theme = {
    name: string;
    colors: { 
      [key: string]: string;
    }
  }

export type ThemesStyle = {
    [key: string]: Theme
};

export const themes: ThemesStyle = {
    dark: {
      name: "dark",
      colors: {
        header: "#130e27",
        background: "#130e27",
        text: "hsl(0, 0%, 100%)",
        button: "#2c69db",
        buttonD: "orange",
        shadow: "#FFFFFF3D",
        placeholder: "#FFFFFF3D",
        modals: "#151718",
      },
    },
    light: {
      name: "light",
      colors: {
        header: "#dbe2f4",
        background: "#f7faff",
        text: "#3c5289",
        button: "#b1c7ff",
        buttonD: "orange",
        shadow: "#cad9ff",
        placeholder: "#8196ca",
        modals: "#e6edff",
      },
    },
}

export const defaultTheme = themes.dark.name;