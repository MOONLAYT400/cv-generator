import { styled } from "styled-components"

export const Wrapper = styled.div``

export const InfoSection = styled.div`
  display: flex;
  gap: 30px;
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;
`

export const InfoInputs = styled.div`
  padding: 8px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 500px;
`
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
`

export const FileInputs = styled.div`
  opacity: 0;
  height: 0;
  width: 0;
  line-height: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
`