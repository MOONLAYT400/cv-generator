import { FC } from "react"

import {
  Wrapper,
  TooltipContent,
  TooltipFooter,
  TooltipTitle,
  Button,
  FormattedMessage,
  BackButton
} from "./index.styled"

interface IOnboardingTooltip {
  continuous: boolean
  index: any
  step: any
  backProps: any
  closeProps: any
  primaryProps: any
  tooltipProps: any
  skipProps: any
}

export const OnboardingTooltip: FC<IOnboardingTooltip> = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  skipProps
}) => {
  return (
    <Wrapper {...tooltipProps}>
      {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
      <TooltipContent>{step.content}</TooltipContent>
      <TooltipFooter>
        {index > 0 && (
          <BackButton {...backProps}>
            Назад
            <FormattedMessage id="back" />
          </BackButton>
        )}
        {continuous && (
          <Button {...skipProps}>
            Пропустить
            <FormattedMessage id="next" />
          </Button>
        )}
        {continuous && (
          <Button {...primaryProps}>
            Дальше
            <FormattedMessage id="next" />
          </Button>
        )}
        {!continuous && (
          <Button {...closeProps}>
            Закрыть
            <FormattedMessage id="close" />
          </Button>
        )}
      </TooltipFooter>
    </Wrapper>
  )
}
