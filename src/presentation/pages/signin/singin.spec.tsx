import React from 'react'
import {
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'
import faker from 'faker'
import Signin from './signin'
import { AuthenticationSpy, ValidationStub } from '@/presentation/tests'
import { SaveAccessTokenMock } from '@/presentation/tests/mock-save-access-token'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const sut = render(
    <Signin
      validation={validationStub}
      authentication={authenticationSpy}
      saveAccessToken={saveAccessTokenMock}
    />
  )

  return {
    sut,
    validationStub,
    authenticationSpy,
    saveAccessTokenMock
  }
}

describe('Signin Component', () => {
  test('Should render correct inputs component', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    expect(emailInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
  })

  test('Should disable submit button if has any Validation error', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = faker.hacker.phrase()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: faker.random.word() } })
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    await waitFor(() => {
      expect(submitButton.disabled).toBe(true)
    })
  })

  test('Should show loader on submit', async () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton.childNodes).toHaveLength(2)
    })
  })

  test('Should call AuthenticationSpy with correct params', async () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, {
      target: { value: password }
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(authenticationSpy.params).toEqual({
        email,
        password
      })
    })
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(saveAccessTokenMock.accessToken).toBe(
        authenticationSpy.account.accessToken
      )
    })
  })
})
