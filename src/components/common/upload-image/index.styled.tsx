import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export interface IUploadLogo {
  $img?: string
  disabled?: boolean
}

export const Wrapper = styled.div<IUploadLogo>`
  max-width: 250px;

  label {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    display: block;
    margin-left: 7px;
    margin-bottom: 4px;
  }

  cursor: pointer;
`

export const FIleDrop = styled.div<IUploadLogo>`
  margin: 0 0 14px;
  width: 180px;
  height: 180px;
  overflow: hidden;
  border: 1px solid ${COLORS.WHITE_24};
  border-radius: 10px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    object-fit: cover;
  }
`

export const Preview = styled.div<IUploadLogo>`
  width: 100%;
  height: 100%;
  background-image: ${({ $img }) => $img};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

export const LoaderWrapper = styled.div`
  position: absolute;
`
export const ThumbnailWrapper = styled.div<IUploadLogo>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Inter;

`
