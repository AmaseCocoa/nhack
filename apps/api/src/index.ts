import { Hono } from 'hono'

const app = new Hono()

app.basePath('/api')

export type App = typeof app;
export default app;

