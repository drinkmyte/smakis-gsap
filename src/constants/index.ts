// src/constants/index.ts
import type { Flavor, Value, NavLink } from '@/types'

export const FLAVORS: Flavor[] = [
  { id: 'tasty-paron',     name: 'Tasty Päron',      image: '/images/products/tasty-paron.png',     tilt:  6 },
  { id: 'tasty-apple',     name: 'Tasty Äpple',      image: '/images/products/tasty-apple.png',     tilt: -8 },
  { id: 'tasty-apelsin',   name: 'Tasty Apelsin',    image: '/images/products/tasty-apelsin.png',   tilt:  5 },
  { id: 'ice-tea-persika', name: 'Ice Tea Persika',  image: '/images/products/ice-tea-persika.png', tilt: -6 },
  { id: 'ice-tea-citron',  name: 'Ice Tea Citron',   image: '/images/products/ice-tea-citron.png',  tilt:  7 },
  { id: 'lingon-blabar',   name: 'Lingon & Blåbär',  image: '/images/products/lingon-blabar.png',   tilt: -5 },
  { id: 'smoothie',        name: 'Smoothie 3L',      image: '/images/products/smoothie.png',        tilt:  8 },
]

export const VALUES: Value[] = [
  { label: 'Ekologiskt',           speed: -0.40 },
  { label: 'Familjeföretag',       speed: -0.20 },
  { label: 'Utan tillsatt socker', speed: -0.08 },
  { label: '100% Naturligt',       speed: -0.40 },
]

export const NAV_LINKS: NavLink[] = [
  { label: 'Produkter',  href: '#flavors' },
  { label: 'Om oss',     href: '#values'  },
  { label: 'Hållbarhet', href: '#values'  },
]
