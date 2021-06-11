import React, { useContext, useEffect } from 'react'
import { message } from 'antd'
import { SigninContext, SigninContextParams } from '@/presentation/contexts'

const SigninAlert: React.FC = () => {
  const { formError } = useContext<SigninContextParams>(SigninContext)

  useEffect(() => {
    if (formError) {
      message.error(formError)
    }
  }, [formError])

  return <></>
}

export default SigninAlert
