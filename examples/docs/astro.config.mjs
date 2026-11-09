// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';

// Set BASE_PATH when the site is served from a sub-path, e.g. /astro-docs-ai on a GitHub project page.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
	site: process.env.SITE_URL || 'https://fengyiqicoder.github.io',
	base,
	integrations: [
		starlight({
			title: 'Lantern',
			description: 'A free Astro docs template with built-in AI Q&A that answers from your own pages.',
			logo: { src: './src/assets/lantern.svg' },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/fengyiqicoder/astro-docs-ai' }],
			customCss: ['./src/styles/custom.css'],
			components: {
				// Starlight's search button plus the Ask AI dialog.
				Search: './src/components/Search.astro',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Getting started', slug: 'guides/getting-started' },
						{ label: 'How Ask AI works', slug: 'guides/ask-ai' },
						{ label: 'Writing content', slug: 'guides/writing-content' },
						{ label: 'Deploy', slug: 'guides/deploy' },
						{ label: 'Customize', slug: 'guides/customize' },
					],
				},
				{ label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
			],
			plugins: [starlightLlmsTxt()],
		}),
	],
});
