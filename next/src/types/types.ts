import { FieldMetadata } from '@conform-to/react'

export type FormFieldType = {
  fields: Record<string, FieldMetadata>
}

export type UserType = {
  alias_id: string
  nickname: string
  image: string
}

export type CurrentUserType = UserType & {
  email: string
  isSignedIn: boolean
}

export type UserRequestType = "registration" | "email_update"

export type CategoryType = {
  id: number | ''
  name: string
}

export type CategoriesType = CategoryType & {
  children: Array<CategoriesType>
}

export type CategoriesInSouvenirType = CategoryType & {
  parent: CategoriesInSouvenirType
}

export type SouvenirSelectType = {
  alias_id: string
  name: string
}
export type SouvenirCardType = SouvenirSelectType & {
  image_url: string
  average_rating?: string | null
}
export type SouvenirDetailType = SouvenirCardType & {
  description: string
  category: CategoriesInSouvenirType
}

export type PagesType = {
  current_page: number
  total_pages: number
  next_page: number | null
  prev_page: number | null
}

export type PostType = {
  alias_id: string
  rating: string | null
  for_who: string | null
  age: string | null
  review: string | null
  image_url: string | null
  user: UserType
  souvenir: SouvenirCardType
}

export type timelineResultType = {
  posts: Array<PostType>
  pages: PagesType
}
