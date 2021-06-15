import React, { useContext, useEffect } from 'react'
import { message } from 'antd'
import { SignInContext, SignInContextParams } from '@/presentation/contexts'

const SignInAlert: React.FC = () => {
  const { formError } = useContext<SignInContextParams>(SignInContext)

  useEffect(() => {
    if (formError) {
      message.error(formError)
    }
  }, [formError])

  return <></>
}

export default SignInAlert
