import { Url } from "next/dist/shared/lib/router/router"

export interface NavItem {
  title: string
  href?: string
  description?: string
  disabled?: boolean
  external?: boolean
  children?: NavItem[]
}
