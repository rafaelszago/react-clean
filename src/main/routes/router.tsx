import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeSignIn } from '../factories/pages/signin/signin-factory'
import { makeSignUp } from '../factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={makeSignIn} />
        <Route path="/signup" exact component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
