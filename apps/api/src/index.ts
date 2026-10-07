import { Hono } from "hono";
import type { AuthType } from "./utils/auth";

import authRouter from "./routes/auth";

const app = new Hono<{ Variables: AuthType }>({
  strict: false,
}).basePath("/api");

const appWithRoutes = app
  .route("/", authRouter)

export type App = typeof appWithRoutes;
export default app;
