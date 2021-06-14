import { LocalSaveAccessToken } from '@/data/usecases'
import { SaveAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '../../storage'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
