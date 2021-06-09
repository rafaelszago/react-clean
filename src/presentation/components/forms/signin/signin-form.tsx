import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Typography, Space } from 'antd'
import { SigninAlert } from '@/presentation/components/alerts'
import {
  FormContext,
  FormContextParams,
  SigninContextParams,
  SigninContext,
} from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validations'

const { Link, Paragraph } = Typography

type Props = {
  validation: Validation
}

const SigninForm: React.FC<Props> = ({ validation }: Props) => {
  const [formState] = useState<FormContextParams>({
    isLoading: true,
  })
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
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <SigninContext.Provider value={state}>
      <SigninAlert />
      <Form name="signin" layout="vertical">
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please insert your e-mail',
            },
          ]}
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
              message: 'Please insert your password!',
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
            <Button type="primary" loading={formState.isLoading}>
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
