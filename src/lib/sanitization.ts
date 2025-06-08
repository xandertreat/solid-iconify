import { ICONIFY_CONFIGURATION } from "~/data/config";

const escapeHTML = (html: string) =>
	html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();

let sanitizer: Promise<(html: string) => string> | undefined;

function getSanitizer() {
	if (!sanitizer) {
		sanitizer = import("xss").then(
			({ default: xss }) =>
				(h: string) =>
					xss(h, ICONIFY_CONFIGURATION.SANITIZE_OPTIONS),
		);
	}
	return sanitizer;
}

export async function sanitizeHtml(html: string) {
	const sanitize = await getSanitizer();
	return escapeHTML(sanitize(html));
}
