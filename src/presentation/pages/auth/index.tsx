import React from 'react'
import { Typography, Layout, Row, Col, Tabs, Skeleton } from 'antd'
import Signin from './signin/signin'
import { ValidationStub } from '@/presentation/tests'

const validationStub = new ValidationStub()

const { Content } = Layout
const { TabPane } = Tabs
const { Title } = Typography

const Auth: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Row>
          <Col span={8} style={{ padding: '64px' }}>
            <Skeleton.Image style={{ marginBottom: '64px' }} />
            <Title>Welcome to Awesome Application</Title>
            <Tabs>
              <TabPane tab="Sign In" key="signin" id="signin">
                <Signin validation={validationStub} />
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
  )
}

export default Auth
