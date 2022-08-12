import axios from 'axios';
import { env } from '../../env/server.mjs';

export const vercelApiClient = axios.create({
	baseURL: 'https://api.vercel.com',
	timeout: 1000,
	headers: {
		Authorization: `Bearer ${env.VERCEL_AUTH_TOKEN}`,
	},
});