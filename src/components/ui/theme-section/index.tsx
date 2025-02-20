import { Theme, themes } from '../../../styles/themes.styled'

import { ThemeButton, ThemeContainer } from "./index.styled";

type Props = {
    handleThemeChange: (theme: Theme) => void
}

export const Themes: React.FC<Props> = ({ handleThemeChange }) => {

    return (
        <ThemeContainer>
            <ThemeButton className='dark' onClick={()=>handleThemeChange(themes.dark)}></ThemeButton>
            <ThemeButton className='light' onClick={()=>handleThemeChange(themes.light)}></ThemeButton>
        </ThemeContainer>
    )
}
