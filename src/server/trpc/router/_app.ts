import { router } from '../trpc';
import { authRouter } from './auth';
import { registerRouter } from './regitster';
import { apartment } from './apartment';

export const appRouter = router({
  auth: authRouter,
  register: registerRouter,
  apartment: apartment,
});

// export type definition of API
export type AppRouter = typeof appRouter;
