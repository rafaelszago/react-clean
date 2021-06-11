import { RemoteAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'

export const makeRemoteAuthentication = (): Authentication => {
  const url = 'http://localhost:3000/api/signin'
  return new RemoteAuthentication(url, makeAxiosHttpClient())
}
