import { FieldMetadata } from '@conform-to/react'

export type FormFieldType = {
  fields: Record<string, FieldMetadata>
}

export type userType = {
  id: number
  name: string
  email: string
  isSignedIn: boolean
  isFetched: boolean
}
