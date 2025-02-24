import { Theme, themes } from '../../../styles/themes.styled'

import { ThemeButton, ThemeContainer } from "./index.styled";

import { Moon24Icon, Sun24Icon } from '@/components/common/icons';

type Props = {
    handleThemeChange: (theme: Theme) => void,
    actualTheme: Theme
}

export const Themes: React.FC<Props> = ({ handleThemeChange, actualTheme }) => {
    const alternativeTheme = actualTheme.name === 'dark' ? 'light' : 'dark';
    return (
        <ThemeContainer>
            <ThemeButton onClick={() => handleThemeChange(themes[alternativeTheme])}>
                {alternativeTheme === 'dark' ?
                    <Moon24Icon></Moon24Icon>
                    : <Sun24Icon></Sun24Icon>}
            </ThemeButton>
        </ThemeContainer>
    )
}
