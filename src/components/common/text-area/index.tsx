import React, { FC, useEffect, useState, useRef, ReactNode } from "react"

import { Wrapper, InputWrapper, InputField, Label } from "./index.styled"

export interface ICustomInput {
  icon?: ReactNode
  label?: string
  width?: string
  disabled?: boolean
  inputValue: string
  placeholder?: string
  errorText?: string
  autoFocus?: boolean
  handleDropError?: () => void
  saveInputValue: (value: string) => void
  handleKeyDown?: (
    event: React.KeyboardEvent<HTMLElement>,
    value: string
  ) => void
}

export const TextArea: FC<ICustomInput> = ({
  label,
  width,
  disabled,
  errorText,
  inputValue,
  autoFocus = false,
  placeholder,
  handleKeyDown,
  saveInputValue,
  handleDropError
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState<string>("")
  const [error, setError] = useState(errorText)
  const [focused, setFocused] = useState(false)

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
    saveInputValue(value)
    setFocused(false)
  }

  const handleInputChange = (text: string) => {
    setValue(text)
    if (error) {
      setError("")
      handleDropError?.()
    }
  }

  return (
    <Wrapper width={width}>
      {label ? <Label>{label}</Label> : null}
      <InputWrapper $focused={focused} $value={!!value}>
        <InputField
          ref={inputRef}
          disabled={disabled}
          value={value}
          onFocus={() => setFocused(true)}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleBlur}
          $error={!!error}
          onKeyDown={(event) => handleKeyDown?.(event, value)}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
      </InputWrapper>

      {/* {!!error ? <Error>{error}</Error> : null} */}
    </Wrapper>
  )
}
