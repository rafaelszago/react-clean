import { createContext } from 'react'

export type FormContextParams = {
  isLoading: boolean
  success: boolean
  errorMessage?: string
}

export const FormContext = createContext<FormContextParams>(null)
