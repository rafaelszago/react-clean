import { createContext } from 'react'

export type SignInContextParams = {
  email: string
  password: string
  emailError?: string
  passwordError?: string
}

export const SignInContext = createContext<SignInContextParams>(null)
