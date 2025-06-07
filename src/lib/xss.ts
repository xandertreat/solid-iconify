import { ICONIFY_CONFIGURATION } from "~/data/config";

let sanitizeHtml: (html: string) => string;

let sanitizeReady: Promise<void>;

async function ensureSanitize(): Promise<void> {
	if (typeof sanitizeHtml === "function") return Promise.resolve();
	if (!sanitizeReady)
		sanitizeReady = import("xss")
			.then(({ default: xss }) => {
				sanitizeHtml = (html: string) =>
					xss(html, ICONIFY_CONFIGURATION.SANITIZE_OPTIONS);
			})
			.catch((e) => Promise.reject(e));
	await sanitizeReady;
}

const escapeHTML = (html: string): string =>
	html?.replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();

export { ensureSanitize, escapeHTML };
