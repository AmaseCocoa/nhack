import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/hi', (c) => {
  return c.text('Hello Hono!')
})

export type App = typeof app;
export default app;
