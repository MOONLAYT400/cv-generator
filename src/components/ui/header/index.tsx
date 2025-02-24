import { Themes } from "../../../components/ui/theme-section/index"

import { Group, Title, Version, Wrapper } from "./index.styled"

import { Theme } from "@/styles/themes.styled"

type Props = {
  handleThemeChange: (theme: Theme) => void,
  actualTheme: Theme
}


export const Header: React.FC<Props> = ({handleThemeChange, actualTheme}) => {
  return (
    <Wrapper>
      <Title>CV Generator</Title>
      <Group>
      <Version>V1.0</Version>
      <Themes handleThemeChange={handleThemeChange} actualTheme={actualTheme}></Themes>
      </Group>
    </Wrapper>
  )
}
