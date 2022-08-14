// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { publicRouter } from "./public";
import { protectedRouter } from "./protected";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("public.", publicRouter)
  .merge("protected.", protectedRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
