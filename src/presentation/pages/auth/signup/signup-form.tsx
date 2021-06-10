import React from 'react'
import { Form, Button, Input } from 'antd'

const SignupForm: React.FC = () => {
  return (
    <Form name="signup" layout="vertical">
      <Form.Item
        label="Full name"
        name="full_name"
        rules={[
          {
            required: true,
            message: 'Please insert your full name',
          },
        ]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
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
            message: 'Please inserr your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Sign up</Button>
      </Form.Item>
    </Form>
  )
}

export default SignupForm
