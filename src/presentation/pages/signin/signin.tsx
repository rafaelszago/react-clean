import React, { useEffect, useState } from 'react'
import {
  Form,
  Button,
  Input,
  Typography,
  Space,
  Tabs,
  Skeleton,
  Layout,
  Row,
  Col,
} from 'antd'
import { SigninContextParams, SigninContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validations'
import { Authentication } from '@/domain/usecases'
import SigninAlert from './components/signin-alert'

const { Link, Title } = Typography
const { TabPane } = Tabs
const { Content } = Layout

type Props = {
  authentication?: Authentication
  validation: Validation
}

const Signin: React.FC<Props> = ({ authentication, validation }: Props) => {
  const [state, setState] = useState<SigninContextParams>({
    isLoading: false,
    email: '',
    password: '',
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    })
  }, [state.email, state.password])

  const handleFormChange = changedValues => {
    setState({
      ...state,
      ...changedValues,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setState({
      ...state,
      isLoading: true,
    })
  }

  return (
    <SigninContext.Provider value={state}>
      <Layout style={{ minHeight: '100vh' }}>
        <SigninAlert />
        <Content>
          <Row>
            <Col span={8} style={{ padding: '64px' }}>
              <Skeleton.Image style={{ marginBottom: '64px' }} />
              <Title>Welcome to Awesome Application</Title>
              <Tabs>
                <TabPane tab="Sign In" key="signin" id="signin">
                  <Form
                    name="signin"
                    layout="vertical"
                    onValuesChange={handleFormChange}
                    onSubmitCapture={handleSubmit}
                  >
                    <Form.Item
                      label="E-mail"
                      name="email"
                      hasFeedback={!!state.emailError}
                      validateStatus={
                        !!state.emailError ? 'error' : 'validating'
                      }
                      help={state.emailError}
                    >
                      <Input
                        placeholder="you@email.com"
                        type="email"
                        data-testid="email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      hasFeedback={!!state.passwordError}
                      validateStatus={
                        !!state.passwordError ? 'error' : 'validating'
                      }
                      help={state.passwordError}
                    >
                      <Input.Password data-testid="password" />
                    </Form.Item>
                    <Form.Item>
                      <Space size="large">
                        <Button
                          type="primary"
                          loading={state.isLoading}
                          disabled={!!state.emailError || !!state.passwordError}
                          htmlType="submit"
                          data-testid="submit"
                        >
                          Sign in
                        </Button>
                        <Link>Forgot password?</Link>
                      </Space>
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane tab="Create new account" key="signup"></TabPane>
              </Tabs>
            </Col>
            <Col
              span={16}
              style={{ backgroundColor: '#0092ff', minHeight: '100vh' }}
            />
          </Row>
        </Content>
      </Layout>
    </SigninContext.Provider>
  )
}

export default Signin
