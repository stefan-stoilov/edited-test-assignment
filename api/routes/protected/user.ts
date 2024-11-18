import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

export const userRoute = app.get("/", async (c) => {
  const token = getCookie(c, "authToken");
  if (token) {
    try {
      await verify(token, process.env.EDITED_SECRET ?? "SECRET");

      // Mock query to DB to get user data

      return c.json(
        {
          user: "hello@edited.com",
        },
        { status: 200 }
      );
    } catch (error) {
      console.log("Error:", error);
    }
  }

  throw new HTTPException(401, { message: "Invalid credentials" });
});
