import { createContext } from 'react'

export type SignInContextParams = {
  email: string
  password: string
  isLoading?: boolean
  emailError?: string
  passwordError?: string
  formError?: string
}

export const SignInContext = createContext<SignInContextParams>(null)
