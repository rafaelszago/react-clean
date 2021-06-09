import { createContext } from 'react'

export type SigninContextParams = {
  email: string
  password: string
}

export const SigninContext = createContext<SigninContextParams>(null)
