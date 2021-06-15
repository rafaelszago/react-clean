import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import SignUp from './signup'
import { ValidationStub } from '@/presentation/tests'
import { SaveAccessTokenMock } from '@/presentation/tests/mock-save-access-token'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const sut = render(
    <SignUp validation={validationStub} saveAccessToken={saveAccessTokenMock} />
  )

  return {
    sut
  }
}

describe('Signin Component', () => {
  test('Should render correct inputs component', () => {
    const { sut } = makeSut()
    const nameInput = sut.getByTestId('name')
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const passwordConfirmationInput = sut.getByTestId('password-confirmation')

    expect(nameInput).toBeTruthy()
    expect(emailInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
    expect(passwordConfirmationInput).toBeTruthy()
  })
})
