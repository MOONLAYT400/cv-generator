"use client"

import { Button } from "@/components/common/button/Button"

export default function Page() {
  return (
    <>
      <Button
        text="asdas"
        handleClick={() => {
          console.log("Button click")
        }}
      />
    </>
  )
}
