export enum HttpStatusCode {
  success = 200,
  noContent = 201,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
