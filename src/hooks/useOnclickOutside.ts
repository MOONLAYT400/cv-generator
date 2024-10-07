import { RefObject, useEffect, MouseEvent } from "react"

type Handler = (
  event: MouseEvent | undefined | MouseEvent<HTMLButtonElement>
) => void

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
) => {
  const handleClickOutside = (e?: globalThis.MouseEvent) => {
    if (
      ref?.current &&
      e?.target &&
      !ref.current.contains(e.target as HTMLElement) &&
      handler
    ) {
      handler(e as unknown as MouseEvent)
    }
  }
  useEffect(() => {
    document.addEventListener(mouseEvent, handleClickOutside)
    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside)
    }
  })
}
