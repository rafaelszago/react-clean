import { createContext } from 'react'

export type SignUpContextParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  nameError?: string
  emailError?: string
  passwordError?: string
  passwordConfirmationError?: string
}

export const SignUpContext = createContext<SignUpContextParams>(null)
