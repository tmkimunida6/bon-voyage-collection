import { FieldMetadata } from '@conform-to/react'

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
  children: Array<CategoryType>
}
