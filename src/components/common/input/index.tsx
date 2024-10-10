import { FC, useEffect, useState, useRef, ReactNode } from "react"

import useDebounce from "@/hooks/useDebounce"

import { CloseSystemIcon, Search20Icon } from "../icons"

import {
  Wrapper,
  InputWrapper,
  InputField,
  Label,
  Error,
  InputAction,
  CloseButton,
  InputActionWrapper
} from "./index.styled"

export interface ICustomInput {
  type?: string
  label?: string
  icon?: ReactNode
  loading?: boolean
  disabled?: boolean
  required?: boolean
  errorText?: string
  actionText?: string
  autoFocus?: boolean
  placeholder?: string
  actionInput?: boolean
  settings?: { step: number }
  inputValue: string | number
  withDebounce?: boolean
  cancelAction?: boolean
  actionHandler?: (value: string | number) => void
  cancelActionHandler?: () => void
  handleDropError?: () => void
  saveInputValue: (value: string | number) => void
  handleKeyDown?: (
    event: React.KeyboardEvent<HTMLElement>,
    value: string | number
  ) => void
}

export const Input: FC<ICustomInput> = ({
  icon,
  type = "text",
  label,
  loading = false,
  settings,
  disabled,
  required = false,
  errorText,
  inputValue,
  autoFocus = false,
  placeholder,
  actionText,
  actionInput = false,
  cancelAction,
  withDebounce = false,
  actionHandler,
  handleKeyDown,
  saveInputValue,
  handleDropError,
  cancelActionHandler
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string | number>("")
  const [error, setError] = useState(errorText)
  const [focused, setFocused] = useState(false)

  const debounced = useDebounce(value, 500)

  useEffect(() => {
    if (withDebounce) handleBlur()
  }, [debounced])

  useEffect(() => {
    if (inputRef?.current && autoFocus)
      setTimeout(() => {
        inputRef?.current?.focus()
      }, 600)
  }, [inputRef])

  useEffect(() => {
    setError(errorText)
  }, [errorText])

  useEffect(() => {
    if (inputValue) setValue(inputValue)
  }, [inputValue])

  const handleBlur = () => {
    setFocused(false)
    if (type === "number") {
      saveInputValue(+value)
      return
    }
    saveInputValue(value)
  }

  const handleInputChange = (text: string | number) => {
    setValue(text)
    if (error) {
      setError("")
      handleDropError?.()
    }
  }

  return (
    <Wrapper>
      {label ? (
        <Label>
          {label}
          {required ? <span>*</span> : null}
        </Label>
      ) : null}

      <InputWrapper $focused={focused} $isError={!!errorText} $value={!!value}>
        {type === "search" ? <Search20Icon /> : null}
        <InputField
          ref={inputRef}
          disabled={disabled}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          $isError={!!error}
          type={type}
          onKeyDown={(event) => handleKeyDown?.(event, value)}
          autoFocus={autoFocus}
          placeholder={placeholder}
          step={settings?.step}
        />
        {actionInput ? (
          <InputActionWrapper>
            <InputAction
              onClick={() => actionHandler?.(value)}
              $loading={loading}
            >
              {icon}
              {actionText}
            </InputAction>
            {cancelAction ? (
              <CloseButton onClick={cancelActionHandler}>
                <CloseSystemIcon />
              </CloseButton>
            ) : null}
          </InputActionWrapper>
        ) : null}
      </InputWrapper>
      <Error $isError={!!error}>{error}</Error>
    </Wrapper>
  )
}
