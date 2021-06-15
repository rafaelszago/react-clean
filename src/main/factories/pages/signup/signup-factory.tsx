import React from 'react'
import SignUp from '@/presentation/pages/signup/signup'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/local-save-access-token-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      authentication={makeRemoteAuthentication()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
