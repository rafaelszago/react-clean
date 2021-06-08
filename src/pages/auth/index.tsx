import React from 'react'
import { useRouter } from 'next/router'
import { Typography, Layout, Row, Col, Tabs, Skeleton } from 'antd'
import { SigninForm, SignupForm } from '@/presentation/components/forms'

const { Content } = Layout
const { TabPane } = Tabs
const { Title } = Typography

const Login: React.FC = () => {
  const router = useRouter()
  const { a: action = 'signin' } = router.query
  const activeTab = String(action)

  const handleTab = tabName => {
    router.push(`/auth?a=${tabName}`)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Row>
          <Col span={8} style={{ padding: '64px' }}>
            <Skeleton.Image style={{ marginBottom: '64px' }} />
            <Title>Welcome to Awesome Application</Title>
            <Tabs activeKey={activeTab} onChange={handleTab}>
              <TabPane tab="Sign In" key="signin" id="signin">
                <SigninForm />
              </TabPane>
              <TabPane tab="Create new account" key="signup">
                <SignupForm />
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
  )
}

export default Login
