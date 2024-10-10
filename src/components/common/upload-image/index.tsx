import { useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"

import { FIleDrop, Preview, ThumbnailWrapper, Wrapper } from "./index.styled"

const focusedStyle = {
  borderColor: "#000"
}

const acceptStyle = {
  borderColor: "#00e676"
}

const rejectStyle = {
  borderColor: "#ff1744"
}

export const UploadLogo = () => {
  const [image, setImage] = useState("")

  const uploadSpaceLogo = async (base64String: string | ArrayBuffer) => {
    setImage(base64String as string)
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      multiple: false,
      accept: { "image/*": [] },
      onDrop: (acceptedFiles: any[]) =>
        acceptedFiles.map((file: any) => handleResizeImage(file))
    })

  const handleResizeImage = (file: any) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      const base64String = event?.target?.result
      if (base64String) uploadSpaceLogo(base64String)
    }
    reader.readAsDataURL(file)
  }

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  console.log(image)

  return (
    <Wrapper>
      <label>Logo</label>
      <FIleDrop {...getRootProps({ style })}>
        {!!image ? (
          <Preview $img={`url(${image})`} />
        ) : (
          <ThumbnailWrapper>Drag&drop or click to upload</ThumbnailWrapper>
        )}
        <input {...getInputProps()} />
      </FIleDrop>
    </Wrapper>
  )
}
