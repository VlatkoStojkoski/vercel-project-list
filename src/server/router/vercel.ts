import { createRouter } from './context';
import { vercelApiClient } from '../client/vercel';

export const vercelRouter = createRouter()
	.query('getAllDeployments', {
		async resolve() {
			try {
				const { data: { projects } } = await vercelApiClient.get('/v9/projects');

				const projectsIncludeDomains = await Promise.all(projects.map(
					async (project: any) => {
						try {
							const { data: { domains } } = await vercelApiClient.get(`/v9/projects/${project.id}/domains`);

							const filteredProjects = Object.fromEntries(
								Object
									.entries({ ...project, domains })
									.filter(([key]) => ['id', 'name', 'createdAt', 'domains'].includes(key))
							);

							return filteredProjects;
						} catch (error) {
							console.error(error);
						}
					}
				));

				return projectsIncludeDomains;
			} catch (error) {
				console.error(error);
			}

			return [];
		},
	});
