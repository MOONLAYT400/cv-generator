import { Theme, themes } from '../../../styles/themes.styled'

import { ThemeButton, ThemeContainer } from "./index.styled";

type Props = {
    handleThemeChange: (theme: Theme) => void
}

export const Themes: React.FC<Props> = ({ handleThemeChange }) => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme") || '');
    const alternativeTheme = currentTheme?.name === "light" ? "dark" : "light";

    return (
        <ThemeContainer>
            <ThemeButton className={alternativeTheme} onClick={() => handleThemeChange(themes[alternativeTheme])}></ThemeButton>
        </ThemeContainer>
    )
}
