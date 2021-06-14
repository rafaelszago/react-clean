import faker from 'faker'
import { HttpPostClientSpy } from '@/data/tests'
import { AccountModel } from '@/domain/models'
import { RemoteAddAccount } from '@/domain/tests'
import { AddAccountParams } from '@/domain/usecases'
import { mockAddAccountParams } from './remote-add-account'

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
})
