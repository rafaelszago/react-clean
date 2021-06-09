import { createContext } from 'react'

export type SigninContextParams = {
  email: string
  password: string
  emailError?: string
  passwordError?: string
}

export const SigninContext = createContext<SigninContextParams>(null)
