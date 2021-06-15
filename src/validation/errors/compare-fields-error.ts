export class CompareFieldsError extends Error {
  constructor() {
    super('Provided values are not equal')
    this.name = 'CompareFieldsError'
  }
}
