import { FC, useEffect, useState, useRef } from "react"

import { DownSystemIcon } from "../icons"

import { Wrapper, InputWrapper, Label, DropDown, Item } from "./Select.styled"
import { useOnClickOutside } from "@/hooks/useOnclickOutside"

type Select = {
  options: any[]
  label?: string
  required?: boolean
  inputValue: any
  outputField?: string
  errorText?: string
  displayField?: string
  saveInputValue: (value: any) => void
}

export const Select: FC<Select> = ({
  options,
  label,
  required = false,
  outputField = "value",
  inputValue,
  displayField = "value",
  saveInputValue
}) => {
  const dropRef = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useState(false)
  const [isShow, setIshShow] = useState(false)
  const [value, setValue] = useState<any>("")
  const [position, setPosition] = useState<"top" | "bottom">("bottom")
  useOnClickOutside(dropRef, () => {
    setIsOpened(false)
    setIshShow(false)
  })

  useEffect(() => {
    if (dropRef?.current?.getBoundingClientRect()) {
      const { top, height } = dropRef.current.getBoundingClientRect()

      if (height > (window.innerHeight - top) / 2) {
        setPosition("top")
      } else {
        setPosition("bottom")
      }
      setIshShow(isOpened)
    }
  }, [isOpened])

  useEffect(() => {
    if (inputValue) {
      const value = options?.find((option) =>
        typeof option === "object"
          ? option[displayField] ===
            (typeof inputValue === "object"
              ? inputValue[displayField]
              : inputValue)
          : option === inputValue
      )
      setValue(value?.label ? value?.label : value)
    }
  }, [inputValue])

  const handleSelectOption = (option: any) => {
    setValue(typeof option === "object" ? option.label : option)

    if (typeof option === "object" && outputField === "object") {
      saveInputValue(option)
      return
    }

    if (typeof option === "object" && outputField !== "object") {
      saveInputValue(option[outputField])
      return
    }

    saveInputValue(option)
  }

  const handleToggleSelect = () => setIsOpened(!isOpened)

  return (
    <Wrapper>
      {label ? (
        <Label>
          {label}
          {required ? <span>*</span> : null}
        </Label>
      ) : null}

      <InputWrapper $focused={isOpened} onClick={handleToggleSelect}>
        <p>{value ? value : "Value..."}</p>
        <DownSystemIcon />
        <DropDown
          $isOpened={isOpened}
          ref={dropRef}
          $position={position}
          $opacity={isShow}
        >
          {options?.map((option: any, index: number) => (
            <Item
              key={index}
              $active={
                value === (typeof option === "object" ? option.label : option)
              }
              onClick={() => handleSelectOption(option)}
            >
              {typeof option === "object" ? option.label : option}
            </Item>
          ))}
        </DropDown>
      </InputWrapper>
    </Wrapper>
  )
}
