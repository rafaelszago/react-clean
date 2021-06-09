import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'
import SigninForm from './signin-form'
import { ValidationStub } from '@/presentation/tests'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = render(<SigninForm validation={validationStub} />)

  return {
    sut,
    validationStub,
  }
}

describe('Signin Component', () => {
  test('Should render login component', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    expect(emailInput).toBeTruthy()
    const passwordInput = sut.getByTestId('password')
    expect(passwordInput).toBeTruthy()
  })
})
