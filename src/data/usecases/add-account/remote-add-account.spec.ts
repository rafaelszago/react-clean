import faker from 'faker'
import { HttpPostClientSpy } from '@/data/tests'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import { RemoteAddAccount } from './remote-add-account'
import { mockAccountModel, mockAddAccountParams } from '@/domain/tests'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
  AddAccountParams,
  AccountModel
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClinet with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClinet with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toBe(addAccountParams)
  })

  test('Should throw InvalidCredentialsError if httpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const body = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
      body
    }
    const promise = sut.add(mockAddAccountParams())

    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if httpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const body = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
      body
    }
    const promise = sut.add(mockAddAccountParams())

    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AccountModel if httpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const body = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body
    }
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(body)
  })
})
