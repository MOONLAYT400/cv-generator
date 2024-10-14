import { FC, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"

import { MODALS } from "@/constants/modals/modals"
import { useOnClickOutside } from "@/hooks/useOnclickOutside"
import { ICreateProjectModal, IModalWrapper } from "@/types/modals"

import { CloseSystemIcon } from "../icons"

import { CloseButton, Modal, Wrapper } from "./index.styled"
import { CreateProject } from "./modal-children/create-project"

const ModalWrapper: FC<IModalWrapper> = ({
  id,
  isOpened,
  close,
  children,
  closeButton = true
}) => {
  const MODAL_DOM_ELEMENT_ID = id
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => {
    if (closeButton) close()
  })
  const modalDom = () =>
    document.getElementById(MODAL_DOM_ELEMENT_ID) as HTMLElement

  useEffect(() => {
    document.addEventListener("keydown", (e: any) => handleKeyPress(e))
    return function cleanup() {
      onHandleStash()
      document.removeEventListener("keydown", (e: any) => handleKeyPress(e))
    }
  }, [])

  useEffect(() => {
    if (isOpened) setIsVisible(true)
  }, [isOpened])

  useEffect(() => {
    if (!isLoaded && isOpened) {
      const div = document.createElement("div")
      div.id = MODAL_DOM_ELEMENT_ID
      document.getElementsByTagName("body")[0].prepend(div)
      setIsLoaded(true)
    }
  }, [isLoaded, isOpened])

  const onAnimationEnd = () => {
    if (!isOpened) {
      setIsVisible(false)
      onHandleStash()
    }
  }

  const onHandleStash = () => {
    setIsLoaded(false)
    document.getElementById(MODAL_DOM_ELEMENT_ID)?.remove()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && closeButton) {
      close()
    }
  }

  return isVisible && isLoaded
    ? ReactDOM.createPortal(
        <Wrapper $isOpened={isOpened} onAnimationEnd={onAnimationEnd}>
          <Modal ref={ref} $isOpened={isOpened}>
            {closeButton ? (
              <CloseButton onClick={close}>
                <CloseSystemIcon />
              </CloseButton>
            ) : null}
            {children}
          </Modal>
        </Wrapper>,
        modalDom()
      )
    : null
}

export const CreateProjectModal: FC<ICreateProjectModal> = ({
  isOpened,
  file,
  close,
  saveProject
}) => (
  <ModalWrapper close={close} isOpened={isOpened} id={MODALS.CREATE_PROJECT}>
    <CreateProject saveProject={saveProject} file={file} close={close} />
  </ModalWrapper>
)
