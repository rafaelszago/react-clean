import React from 'react'
import Signin from '@/presentation/pages/signin/signin'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './signin-validation-factory'
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/local-save-access-token-factory'

export const makeLogin: React.FC = () => {
  return (
    <Signin
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
