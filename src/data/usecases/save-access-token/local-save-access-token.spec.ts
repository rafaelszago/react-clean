import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/tests'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.alpha({ count: 116 })

    await sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
