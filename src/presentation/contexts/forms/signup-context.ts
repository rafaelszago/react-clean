import { createContext } from 'react'

export type SignUpContextParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  isLoading?: boolean
  nameError?: string
  emailError?: string
  passwordError?: string
  passwordConfirmationError?: string
  formError?: string
}

export const SignUpContext = createContext<SignUpContextParams>(null)
