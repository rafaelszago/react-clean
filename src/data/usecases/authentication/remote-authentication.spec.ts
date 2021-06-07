import { HttpPostClientSpy } from '../../tests/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClient)
    await sut.auth()
    expect(httpPostClient.url).toBe(url)
  })
})
