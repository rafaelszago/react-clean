import { createContext } from 'react'

export type SigninContextParams = {
  isLoading: boolean
  errorMessage?: string
  successMessage?: string
}

export const SigninContext = createContext<SigninContextParams>(null)
