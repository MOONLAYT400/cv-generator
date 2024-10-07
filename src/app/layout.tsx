import type { Metadata } from "next"
import "../styles/globals.css"
import { StyledComponentsRegistry } from "@/lib/registry"

export const metadata: Metadata = {
  title: "CV-Maker",
  description: "Cv maker from dedicated parameters"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
