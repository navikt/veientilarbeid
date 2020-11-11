import { rest } from 'msw'
import { AUTH_API } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';
import AuthResponse from './auth-mock'

export const handlers = [
  rest.get(AUTH_API, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(AuthResponse)
    )
  })
]