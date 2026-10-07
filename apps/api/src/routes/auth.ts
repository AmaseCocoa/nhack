import { Hono } from 'hono'
import { auth } from '../utils/auth'
import type { AuthType } from '../utils/auth'

const router = new Hono<{ Bindings: AuthType }>({
  strict: false,
})

router.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

export default router
