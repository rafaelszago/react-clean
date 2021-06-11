import { createContext } from 'react'

export type SigninContextParams = {
  email: string
  password: string
  isLoading?: boolean
  emailError?: string
  passwordError?: string
  formError?: string
}

export const SigninContext = createContext<SigninContextParams>(null)
