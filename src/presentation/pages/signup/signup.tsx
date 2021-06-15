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
  Col
} from 'antd'
import { SignUpContextParams, SignUpContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validations'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'

const { Link, Title } = Typography
const { TabPane } = Tabs
const { Content } = Layout

type Props = {
  authentication?: Authentication
  validation: Validation
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({
  authentication,
  validation,
  saveAccessToken
}: Props) => {
  const history = useHistory()

  const [state, setState] = useState<SignUpContextParams>({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      )
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleFormChange = (changedValues): any => {
    setState({
      ...state,
      ...changedValues
    })
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      setState({
        ...state,
        isLoading: true
      })

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.accessToken)
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        formError: error.message
      })
    }
  }

  const handleTabs = (activeKey: string): any => {
    history.push(`/${activeKey}`)
  }

  return (
    <SignUpContext.Provider value={state}>
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Row>
            <Col span={8} style={{ padding: '64px' }}>
              <Skeleton.Image style={{ marginBottom: '64px' }} />
              <Title>Welcome to Awesome Application</Title>
              <Tabs onChange={handleTabs} activeKey="signup">
                <TabPane tab="Sign In" key="signin" id="signin"></TabPane>
                <TabPane tab="Create new account" key="signup" id="signup">
                  <Form
                    name="signup"
                    layout="vertical"
                    onValuesChange={handleFormChange}
                    onSubmitCapture={handleSubmit}
                  >
                    <Form.Item
                      label="Name"
                      name="name"
                      hasFeedback={!!state.nameError}
                      validateStatus={state.nameError ? 'error' : 'validating'}
                      help={state.nameError}
                    >
                      <Input placeholder="Full Name" data-testid="name" />
                    </Form.Item>
                    <Form.Item
                      label="E-mail"
                      name="email"
                      hasFeedback={!!state.emailError}
                      validateStatus={state.emailError ? 'error' : 'validating'}
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
                        state?.passwordError ? 'error' : 'validating'
                      }
                      help={state.passwordError}
                    >
                      <Input.Password data-testid="password" />
                    </Form.Item>
                    <Form.Item
                      label="Password confirmation"
                      name="passwordConfirmation"
                      hasFeedback={!!state.passwordError}
                      validateStatus={
                        state.passwordError ? 'error' : 'validating'
                      }
                      help={state.passwordError}
                    >
                      <Input.Password data-testid="passwordConfirmation" />
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
                          Sign up
                        </Button>
                        <Link>Forgot password?</Link>
                      </Space>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
            </Col>
            <Col
              span={16}
              style={{ backgroundColor: '#0092ff', minHeight: '100vh' }}
            />
          </Row>
        </Content>
      </Layout>
    </SignUpContext.Provider>
  )
}

export default SignUp
