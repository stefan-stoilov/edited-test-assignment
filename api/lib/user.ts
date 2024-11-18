import type { LoginSchemaType } from "../../src/models";

/**
 * Mocking returning user's hashed password
 */
export const getUserPasswordByUsername = async (
  username: LoginSchemaType["username"]
) => {
  if (username !== "hello@edited.com") {
    return null;
  } else {
    return "hello123";
  }
};

/**
 * Mocking returning all of the user's data
 */
export const getUserByUsername = async (
  username: LoginSchemaType["username"]
) => {
  if (username !== "hello@edited.com") {
    return null;
  } else {
    return { username };
  }
};
