import { hc } from 'hono/client'
import type { App } from '@nhack-app/api'

export const client = hc<App>('http://localhost:3000')
