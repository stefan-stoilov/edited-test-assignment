import { Hono } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const app = new Hono();

export const logoutRoute = app.post("/", async (c) => {
  // Clear the JWT token cookie
  setCookie(c, "authToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() - 1000),
  });

  const token = getCookie(c, "authToken");
  if (token) {
    try {
      const payload = await verify(
        token,
        process.env.EDITED_SECRET ?? "SECRET"
      );

      // Add the token to a blacklist (e.g., Redis)
      // await addToBlacklist(payload.jti);

      console.log("Token invalidated:", payload);
    } catch (error) {
      console.error("Error invalidating token:", error);
    }
  }

  return c.json({ message: "Logged out successfully" });
});
