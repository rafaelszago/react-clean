import React, { useContext, useEffect } from 'react'
import { message } from 'antd'
import { SigninContext, SigninContextParams } from '@/presentation/contexts'

const SigninAlert: React.FC = () => {
  const { errorMessage, successMessage } =
    useContext<SigninContextParams>(SigninContext)

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage)
    }
  }, [errorMessage])

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage)
    }
  }, [successMessage])

  return <></>
}

export default SigninAlert
