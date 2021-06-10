import React, { useContext, useEffect } from 'react'
import { message } from 'antd'
import { SigninContext, SigninContextParams } from '@/presentation/contexts'

const SigninAlert: React.FC = () => {
  const { emailError, passwordError } =
    useContext<SigninContextParams>(SigninContext)

  useEffect(() => {
    if (emailError) {
      message.error(passwordError)
    }
  }, [emailError])

  useEffect(() => {
    if (passwordError) {
      message.success(passwordError)
    }
  }, [passwordError])

  return <></>
}

export default SigninAlert
