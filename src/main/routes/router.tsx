import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from '@/presentation/pages/auth'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
