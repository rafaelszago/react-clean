import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import Signin from './signin'
import { ValidationStub } from '@/presentation/tests'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = render(<Signin validation={validationStub} />)

  validationStub.errorMessage = faker.random.words()

  return {
    sut,
    validationStub,
  }
}

describe('Signin Component', () => {
  test('Should render login component', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    expect(emailInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
  })
})
