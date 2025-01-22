import { FC, useEffect, useState, useRef } from "react"

import useDebounce from "@/hooks/useDebounce"
import { useOnClickOutside } from "@/hooks/useOnclickOutside"

import { DownSystemIcon } from "../icons"

import {
  Wrapper,
  InputWrapper,
  Label,
  DropDown,
  Item,
  InputField
} from "./index.styled"

type SearchSelect = {
  options: any[]
  label?: string
  errorText?: string
  required?: boolean
  outputField?: string
  displayField?: string
  saveInputValue: (value: any) => void
}

export const SearchSelect: FC<SearchSelect> = ({
  label,
  options,
  required = false,
  outputField = "value",
  displayField = "value",
  saveInputValue
}) => {
  const dropRef = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useState(false)
  const [isShow, setIshShow] = useState(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredOptions, setFilteredOptions] = useState<any[]>(options)
  const [position, setPosition] = useState<"top" | "bottom">("bottom")
  const debouncedSearchValue = useDebounce(searchValue, 500)
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
    if (debouncedSearchValue) {
      const filtered = options.filter((option) => {
        if (typeof option === "object") {
          return option[displayField]
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase())
        }

        return option.toLowerCase().includes(debouncedSearchValue.toLowerCase())
      })
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(options)
    }
  }, [debouncedSearchValue])

  const handleSelectOption = (option: any) => {
    if (typeof option === "object" && outputField === "object") {
      return saveInputValue(option)
    }

    if (typeof option === "object" && outputField !== "object") {
      return saveInputValue(option[outputField])
    }

    saveInputValue(option)
  }

  const handleToggleSelect = () => setIsOpened(!isOpened)

  const handleChangeSearch = (value: string) => setSearchValue(value)

  return (
    <Wrapper>
      {label ? (
        <Label>
          {label}
          {required ? <span>*</span> : null}
        </Label>
      ) : null}

      <InputWrapper $focused={isOpened} onClick={handleToggleSelect}>
        <InputField
          value={searchValue}
          placeholder="Технология..."
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
        <DownSystemIcon />
        <DropDown
          $isOpened={isOpened}
          ref={dropRef}
          $position={position}
          $opacity={isShow}
        >
          {filteredOptions?.map((option: any, index: number) => (
            <Item key={index} onClick={() => handleSelectOption(option)}>
              <p>{typeof option === "object" ? option[displayField] : option}</p>
            </Item>
          ))}
        </DropDown>
      </InputWrapper>
    </Wrapper>
  )
}
