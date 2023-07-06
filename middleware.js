import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

const cred = process.env.BASIC_AUTH_CREDENTIALS || "";

const auth =
  cred.length === 0
    ? createNextAuthMiddleware()
    : createNextAuthMiddleware({ users: [{ user: "test", password: "test" }] });

export default auth;
