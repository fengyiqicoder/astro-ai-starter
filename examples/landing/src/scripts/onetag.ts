// Loads the OneTag AI SDK on first use, so it never affects page load. Both AI features share it.
// The key comes from PUBLIC_ONETAG_KEY (see .env.example for how to get one with a single curl).
// This key is designed to be public: it ships in the HTML like an analytics ID and can only spend this account's allowance.
declare global {
	interface Window {
		onetag?: any;
	}
}

let loading: Promise<any> | null = null;

export function loadOneTag(): Promise<any> {
	if (window.onetag) return Promise.resolve(window.onetag);
	if (loading) return loading;
	const cfg = document.documentElement.dataset;
	loading = new Promise((resolve, reject) => {
		const s = document.createElement('script');
		s.src = (cfg.onetagSite || 'https://onetagai.com') + '/v1.js';
		s.dataset.key = cfg.onetagKey || '';
		s.onload = () => resolve(window.onetag);
		s.onerror = () => reject(Object.assign(new Error('Could not load the AI script.'), { code: 'network' }));
		document.head.append(s);
	});
	return loading;
}

export const MESSAGES: Record<string, string> = {
	no_key: 'The AI features are not set up on this site yet (no OneTag AI key).',
	quota_exceeded: 'This site has used up its AI allowance for now.',
	paused: 'The AI service is paused for today. Try again after 00:00 UTC.',
	rate_limited: 'Too many requests in one minute. Give it a moment.',
	too_large: 'That is too long for one question.',
	network: 'Could not reach the AI service. Check your connection and try again.',
	upstream: 'The AI provider had a problem. Try again in a few seconds.',
	bad_json: 'The answer came back in an unexpected shape. Try again.',
	aborted: 'Stopped.',
};

export const describe = (e: any) => MESSAGES[e?.code] || e?.message || 'Something went wrong.';
