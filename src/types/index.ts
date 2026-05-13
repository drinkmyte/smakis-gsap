// src/types/index.ts
export interface Flavor {
  id: string
  name: string
  image: string
  tilt: number
  badge?: string
}

export interface Value {
  label: string
  speed: number
}

export interface NavLink {
  label: string
  href: string
}
