import { usePathname, useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

import { ROUTE_GENERATOR } from "@/constants/router/routes"

export const NavWrapper = ({ children }: PropsWithChildren) => {
  const { push } = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/generator") push(ROUTE_GENERATOR)
  }, [])

  return children
}
