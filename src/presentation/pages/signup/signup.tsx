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
import {
  SignUpContextParams,
  SignUpContext,
  FormContext,
  FormContextParams
} from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validations'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { FormAlert } from '@/presentation/components'
import { useHistory } from 'react-router-dom'

const { Link, Title } = Typography
const { TabPane } = Tabs
const { Content } = Layout

type Props = {
  addAccount?: AddAccount
  validation: Validation
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({
  addAccount,
  validation,
  saveAccessToken
}: Props) => {
  const history = useHistory()

  const [state, setState] = useState<SignUpContextParams>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [formState, setFormState] = useState<FormContextParams>({
    isLoading: false,
    success: false
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation,
        state.password
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
      setFormState({
        ...formState,
        isLoading: true
      })

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      if (account.accessToken) {
        await saveAccessToken.save(account.accessToken)

        setFormState({
          ...formState,
          isLoading: false,
          success: true,
          errorMessage: ''
        })

        history.push('/app')
      }
    } catch (error) {
      setFormState({
        ...formState,
        isLoading: false,
        errorMessage: error.message
      })
    }
  }

  const handleTabs = (activeKey: string): any => {
    history.push(`/${activeKey}`)
  }

  const hasFormError = (): boolean => {
    return (
      !!state.emailError ||
      !!state.passwordError ||
      !!state.nameError ||
      !!state.passwordConfirmationError
    )
  }

  return (
    <>
      <FormContext.Provider value={formState}>
        <FormAlert />
      </FormContext.Provider>
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
                        validateStatus={
                          state.nameError ? 'error' : 'validating'
                        }
                        help={state.nameError}
                      >
                        <Input placeholder="Full Name" data-testid="name" />
                      </Form.Item>
                      <Form.Item
                        label="E-mail"
                        name="email"
                        hasFeedback={!!state.emailError}
                        validateStatus={
                          state.emailError ? 'error' : 'validating'
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
                          state?.passwordError ? 'error' : 'validating'
                        }
                        help={state.passwordError}
                      >
                        <Input.Password data-testid="password" />
                      </Form.Item>
                      <Form.Item
                        label="Password confirmation"
                        name="passwordConfirmation"
                        hasFeedback={!!state.passwordConfirmationError}
                        validateStatus={
                          state.passwordConfirmationError
                            ? 'error'
                            : 'validating'
                        }
                        help={state.passwordConfirmationError}
                      >
                        <Input.Password data-testid="passwordConfirmation" />
                      </Form.Item>
                      <Form.Item>
                        <Space size="large">
                          <Button
                            type="primary"
                            loading={formState.isLoading}
                            disabled={hasFormError()}
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
    </>
  )
}

export default SignUp
