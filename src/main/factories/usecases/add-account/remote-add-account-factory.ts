import { RemoteAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'

export const makeRemoteAddAccount = (): AddAccount => {
  const url = 'http://localhost:3000/api/signup'
  return new RemoteAddAccount(url, makeAxiosHttpClient())
}
