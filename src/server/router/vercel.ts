import { createRouter } from './context';
import { z } from 'zod';

export const vercelRouter = createRouter()
	.query('hello', {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		resolve({ input }) {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`,
			};
		},
	});
