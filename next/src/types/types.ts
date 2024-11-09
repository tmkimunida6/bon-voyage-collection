import { FieldMetadata } from '@conform-to/react'

export type FormFieldType = {
  fields: Record<string, FieldMetadata>
}

export type UserType = {
  id: number
  name: string
  email: string
  isSignedIn?: boolean
}

export type CategoryType = {
  id: number | ''
  name: string
}

export type CategoriesType = CategoryType & {
  children: Array<CategoriesType>
}

export type SouvenirCardType = {
  id: number | ''
  name: string
}

export type SouvenirType = {
  id: number
  name: string
  description: string
  created_at: Date
  user: UserType
  categories: CategoriesType
}

export type PagesType = {
  current_page: number
  total_pages: number
  next_page: number | null
  prev_page: number | null
}

export type PostType = {
  id: number
  rating: string
  for_who: string | null
  age: string | null
  review: string
  created_at: Date
  user: UserType
  souvenir: SouvenirType
}
