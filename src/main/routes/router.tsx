import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '../factories/pages/signin/signin-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
