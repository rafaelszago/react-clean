import React, { useContext, useEffect } from 'react'
import { message } from 'antd'
import { SigninContext, SigninContextParams } from '@/presentation/contexts'

const SigninAlert: React.FC = () => {
  const { httpError } = useContext<SigninContextParams>(SigninContext)

  useEffect(() => {
    if (httpError) {
      message.error(httpError)
    }
  }, [httpError])

  return <></>
}

export default SigninAlert
