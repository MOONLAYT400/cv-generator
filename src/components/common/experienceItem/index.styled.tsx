import { styled } from "styled-components"

export const Wrapper = styled.div`
border: 1px solid #4f4f4f;
border-radius: 10px;
margin: 6px;
padding: 4px;
display: flex;
justify-content: space-between;
box-shadow: 2px 2px 6px 1px #4f4f4f;
`
export const ItemDescription = styled.div`
display: flex;
align-items: center;
word-wrap: break-word;
width: 90%;
word-break: break-word;
`
export const ButtonsGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
flex: 0 1 auto;
max-width: 90%
`

export const Button = styled.button`
height: auto;
background: #7852FB;
color: white;
border: 1px solid #7852FB;
border-radius: 3px;
padding: 3px;
margin: 2px;
`

