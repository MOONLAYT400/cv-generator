import { toast } from "react-toastify"

export const useToastify = () => {
  const currentTheme: string = "dark"

  const message = (type: string, text: string) =>
    //@ts-expect-error - no ts description
    toast[type](text, {
      //@ts-expect-error - no ts description
      theme: THEMES[currentTheme]
    })
  return message
}
