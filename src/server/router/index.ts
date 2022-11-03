// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedExampleRouter } from "./protected-example-router";
import { authorize } from "./authorize";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("authorize.", authorize)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
