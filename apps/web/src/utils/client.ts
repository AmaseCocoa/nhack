import type { App } from "@nhack-app/api";
import { hc } from "hono/client";

export const client = hc<App>("http://localhost:3000");
