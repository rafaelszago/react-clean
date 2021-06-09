import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Typography, Space } from 'antd'
import {
  FormContextParams,
  SigninContextParams,
  SigninContext,
} from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validations'

const { Link } = Typography

type Props = {
  validation: Validation
}

const SigninForm: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<SigninContextParams>({
    email: '',
    password: '',
  })

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    })
  }, [state.email, state.password])

  return (
    <SigninContext.Provider value={state}>
      <Form name="signin" layout="vertical">
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input
            placeholder="you@email.com"
            name="email"
            type="email"
            data-testid="email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: state.passwordError,
            },
          ]}
        >
          <Input.Password
            name="password"
            onChange={handleChange}
            data-testid="password"
          />
        </Form.Item>
        <Form.Item>
          <Space size="large">
            <Button
              type="primary"
              disabled={!!state.emailError || !!state.passwordError}
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

export default SigninForm
