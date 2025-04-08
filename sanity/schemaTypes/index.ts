import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { Roboto } from 'next/font/google'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType],
}
export const roboto = Roboto({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-roboto',
  display: 'swap',
  style: 'normal',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  adjustFontFallback: true,
})
