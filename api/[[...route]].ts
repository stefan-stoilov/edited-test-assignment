import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";

import { userRoute } from "./routes/protected";
import { loginRoute, logoutRoute } from "./routes";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/user", userRoute)
  .route("/login", loginRoute)
  .route("/logout", logoutRoute);

app.all("*", (c) => c.text("404: Not Found"));

// Register the handler for Vercel Edge Functions
export const GET = handle(app);
export const POST = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;

export default app;
export type ApiRoutes = typeof apiRoutes;
