import React from 'react'
import SignUp from '@/presentation/pages/signup/signup'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount, makeLocalSaveAccessToken } from '../../usecases'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
