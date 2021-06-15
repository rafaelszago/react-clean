import {
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'
import React from 'react'
import faker from 'faker'
import SignUp from './signup'
import { AddAccountSpy, ValidationStub } from '@/presentation/tests'
import { SaveAccessTokenMock } from '@/presentation/tests/mock-save-access-token'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const addAccountSpy = new AddAccountSpy()

  const sut = render(
    <SignUp
      addAccount={addAccountSpy}
      validation={validationStub}
      saveAccessToken={saveAccessTokenMock}
    />
  )

  return {
    sut,
    validationStub,
    addAccountSpy
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

  test('Should disable submit button if has any Validation error', async () => {
    const { sut, validationStub } = makeSut()
    const nameInput = sut.getByTestId('name')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    validationStub.errorMessage = faker.hacker.phrase()
    fireEvent.input(nameInput, { target: { value: faker.random.word() } })

    await waitFor(() => {
      expect(submitButton.disabled).toBe(true)
    })
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const nameInput = sut.getByTestId('name')
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const passwordConfirmationInput = sut.getByTestId('password-confirmation')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const name = faker.name.firstName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(nameInput, { target: { value: name } })
    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.input(passwordConfirmationInput, { target: { value: password } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(addAccountSpy.params).toEqual({
        name,
        email,
        password,
        passwordConfirmation: password
      })
    })
  })
})
