import React, { useState } from 'react'
import { Form, Button, Input, Typography, Space } from 'antd'
import { SigninAlert } from '@/presentation/components/alerts'
import { SigninContext } from '@/presentation/contexts'

const { Link } = Typography

const SigninForm: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',
    successMessage: '',
  })

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
          <Input placeholder="you@email.com" type="email" />
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
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Space size="large">
            <Button type="primary" loading={state.isLoading}>
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
