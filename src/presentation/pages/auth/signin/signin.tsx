import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Typography, Space } from 'antd'
import { SigninContextParams, SigninContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validations'

const { Link, Paragraph } = Typography

type Props = {
  validation: Validation
}

const Signin: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<SigninContextParams>({
    email: '',
    password: '',
  })

  const handleFormChange = changedValues => {
    setState({
      ...state,
      ...changedValues,
    })
  }

  useEffect(() => {
    setState({
      ...state,
      emailError: 'any_error',
      // emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    })
  }, [state.email, state.password])

  return (
    <SigninContext.Provider value={state}>
      <Form name="signin" layout="vertical" onValuesChange={handleFormChange}>
        <Form.Item
          label="E-mail"
          name="email"
          hasFeedback={!!state.emailError}
          validateStatus={!!state.emailError ? 'error' : 'validating'}
          help={state.emailError}
        >
          <Input placeholder="you@email.com" type="email" data-testid="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password data-testid="password" />
        </Form.Item>
        <Form.Item>
          <Space size="large">
            <Button
              type="primary"
              disabled={!!state.emailError || !!state.passwordError}
              htmlType="submit"
            >
              Sign in
            </Button>
            <Link>Forgot password?</Link>
          </Space>
        </Form.Item>
      </Form>
    </SigninContext.Provider>
  )
}

export default Signin
