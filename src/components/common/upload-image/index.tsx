import { FC, useMemo, useState } from "react"
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

interface IImageWithPreview {
  label?: string
  imageSrc: string
  saveImage: (image: string) => void
}

export const ImageWithPreview: FC<IImageWithPreview> = ({
  label = "Image",
  imageSrc,
  saveImage
}) => {
  const [image, setImage] = useState(imageSrc)

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      multiple: false,
      accept: { "image/*": [] },
      onDrop: (acceptedFiles: any[]) =>
        acceptedFiles.map((file: any) => handleBufferImage(file))
    })

  const handleBufferImage = (file: any) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      const base64String = event?.target?.result
      if (base64String) {
        setImage(base64String as string)
        saveImage(base64String as string)
      }
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

  return (
    <Wrapper>
      <label>{label}</label>
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
