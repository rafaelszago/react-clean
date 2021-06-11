import React from 'react'
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
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

  test('Should disable submit button if has Validation errors', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = faker.hacker.phrase()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.input(emailInput, { target: { value: faker.random.word() } })
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    })
    await waitFor(() => {
      expect(submitButton.disabled).toBe(true)
    })
  })

  test('Should show loader on submit', async () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(submitButton.childNodes).toHaveLength(2)
    })
  })
})
