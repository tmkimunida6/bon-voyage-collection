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

export type UserRequestType = 'registration' | 'change_email'

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
  place_id: string | null
  price: string | null
  currency: string | null
  memory_image_url: string | null
  memory_content: string | null
  user: UserType
  souvenir: SouvenirCardType
}

export type timelineResultType = {
  posts: Array<PostType>
  pages: PagesType
}

export type selectedPlaceType = {
  place_id: string
  name: string
}

export type placesResultType = {
  description: string
  matched_substrings: Array<{ length: number; offset: number }>
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: Array<{ length: number; offset: number }>
    secondary_text: string
    secondary_text_matched_substrings: Array<{ length: number; offset: number }>
  }
  terms: Array<{ offset: number; value: string }>
  types: Array<string>
}

export type currencyResultType = {
  code: string
  name: string
}

export type markerType = {
  place_id: string
  lat: number
  lng: number
  name: string
  address: string
  weekday_text: Array<string>
  website: string
  rating: number
  user_ratings_total: number
  url: string
  marker_img: string
}
