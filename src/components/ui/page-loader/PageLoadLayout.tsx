"use client"

import { Loader, LoaderWrapper } from "./PageLoadLayout.styled"

export const PageLoadLayout = () => {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  )
}
