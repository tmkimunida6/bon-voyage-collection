import { FieldMetadata } from '@conform-to/react'
import { number } from 'zod'

export type FormFieldType = {
  fields: Record<string, FieldMetadata>
}

export type UserType = {
  id: number
  name: string
  email: string
  isSignedIn: boolean
}

export type CategoryType = {
  id: number
  name: string
}

export type CategoriesType = CategoryType & {
  children: Array<CategoriesType>
}

export type SouvenirCardType = {
  id: number
  name: string
}