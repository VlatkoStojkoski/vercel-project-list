// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { vercelRouter } from './vercel';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('vercel.', vercelRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
