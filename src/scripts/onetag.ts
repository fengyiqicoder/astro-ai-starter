// Loads the OneTag SDK the first time an AI feature is used, so pages ship no extra script by default.
// The key and site come from data attributes on <html>, set by the layout from src/config.ts.
// This key is designed to be public: it ships in the HTML like an analytics ID and can only spend this account's allowance.
declare global {
	interface Window {
		onetag?: { ask: (prompt: string, input?: unknown, options?: Record<string, unknown>) => Promise<any>; OneTagError: any };
	}
}

let loading: Promise<NonNullable<Window['onetag']>> | null = null;

export function hasKey(): boolean {
	const key = document.documentElement.dataset.onetagKey || '';
	return key.length > 0 && !/^YOUR_/i.test(key);
}

export function loadOnetag(): Promise<NonNullable<Window['onetag']>> {
	if (window.onetag) return Promise.resolve(window.onetag);
	if (loading) return loading;
	const root = document.documentElement.dataset;
	if (!hasKey()) return Promise.reject(new Error('no_key'));
	loading = new Promise((resolve, reject) => {
		const s = document.createElement('script');
		s.src = (root.onetagSite || 'https://onetagai.com') + '/v1.js';
		s.dataset.key = root.onetagKey || '';
		s.onload = () => (window.onetag ? resolve(window.onetag) : reject(new Error('sdk_missing')));
		s.onerror = () => reject(new Error('network'));
		document.head.appendChild(s);
	});
	return loading;
}

export const MESSAGES: Record<string, string> = {
	no_key: 'AI is not set up on this site yet: the owner needs to add a OneTag AI key.',
	quota_exceeded: 'This site has used its AI allowance for now.',
	rate_limited: 'Too many requests at once. Try again in a moment.',
	network: 'Could not reach the AI service. Check your connection and try again.',
	aborted: 'Stopped.',
};

export function errorText(e: any): string {
	const code = e?.code || e?.message;
	return MESSAGES[code] || 'Something went wrong. Try again.';
}

// The page's main text, for features that read the current post.
export function pageText(selector = 'article'): string {
	const el = document.querySelector<HTMLElement>(selector) || document.body;
	return (el.innerText || el.textContent || '').trim();
}
