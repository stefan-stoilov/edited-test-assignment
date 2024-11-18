import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import { loginSchema } from "../../src/models";
import { getUserPasswordByUsername } from "../lib";

const app = new Hono();

export const loginRoute = app.post("/", async (c) => {
  try {
    const res = await c.req.json();

    const validatedData = loginSchema.safeParse(res);

    if (validatedData.error) {
      throw new HTTPException(400, { message: validatedData.error.message });
    }

    const { username, password, shouldRememberUser } = validatedData.data;

    const user = await getUserPasswordByUsername(username);

    if (!user) {
      throw new HTTPException(401, { message: "Invalid credentials" });
    }

    // Mock comparison
    // const doPasswordsMatch = await bcrypt.compare(password, user.password);
    const doPasswordsMatch = password === user;
    if (!doPasswordsMatch) {
      throw new HTTPException(401, { message: "Invalid credentials" });
    }

    const day = 60 * 60 * 1000;
    const expirationTime = shouldRememberUser ? day : 60;
    const payload = {
      username,
      exp: Math.floor(Date.now() / 1000) + expirationTime,
    };

    const token = await sign(payload, process.env.EDITED_SECRET ?? "SECRET");

    setCookie(c, "authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: shouldRememberUser ? day : undefined, // Persistent if remember me, otherwise session cookie
    });

    return c.json({
      user: user,
    });
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message }, { status: error.status });
    }
    return c.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
});
