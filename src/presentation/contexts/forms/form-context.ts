import { createContext } from 'react'

export type FormContextParams = {
  isLoading: boolean
  errorMessage?: string
  successMessage?: string
}

export const FormContext = createContext<FormContextParams>({
  isLoading: false,
  errorMessage: '',
  successMessage: ''
})
