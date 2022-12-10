import {HttpResponse} from "@protocols/http"
import { ServerError } from "@errors/server-error"
import { UnauthorizedError } from "@errors/unauthorized-error"

export const serverError = (error: Error): HttpResponse => {
  const errorStack = error.stack
  return {
    statusCode: 500,
    body: new ServerError(errorStack)
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const unauthorized = (error: Error): HttpResponse => {
  return {
    statusCode: 401,
    body: error
  }
}

export const notFound = (error: Error): HttpResponse => {
  return {
    statusCode: 404,
    body: error
  }
}