import React, { useContext, useEffect } from 'react'
import { message } from 'antd'
import { FormContext, FormContextParams } from '@/presentation/contexts'

const FormAlert: React.FC = () => {
  const { errorMessage, isLoading, success } =
    useContext<FormContextParams>(FormContext)

  useEffect(() => {
    if (success) {
      message.success('Form submitted successfully!')
    }
    if (isLoading) {
      const loading = message.loading('Submitting form...', 500)
      setTimeout(loading, 500)
    }
    if (errorMessage) {
      message.error(errorMessage)
    }
  }, [errorMessage, isLoading, success])

  return <></>
}

export default FormAlert
