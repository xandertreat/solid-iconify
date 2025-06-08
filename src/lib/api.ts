import type { IconifyJSON } from "@iconify/types";
import { delCacheIcon, getCacheIcon, setCacheIcon } from "~/data/cache";
import { ICONIFY_CONFIGURATION } from "~/data/config";
import type { IconifyData, IconifySpecifier } from "~/types/global";
import { sanitizeHtml } from "./sanitization";

// helpers //
function coerceToHost(uriLike: string | URL): string {
	let str: string;
	if (typeof uriLike === "string")
		str = uriLike.substring(uriLike.indexOf("//") + 1).replace(/\//g, "");
	else str = uriLike.hostname;
	return str.normalize().trim();
}

function getUri({
	collection,
	icons,
	api,
}: {
	collection: string;
	icons: string[];
	api: number;
}): URL {
	if (!collection || !icons || icons.length <= 0)
		throw Error(`[solid-iconify] Bad specifier: ${collection}, ${icons}`);

	const src = ICONIFY_CONFIGURATION.ICONIFY_API;
	let host: string;
	if (Array.isArray(src)) {
		host = coerceToHost(src[api % src.length]);
	} else host = coerceToHost(src as string | URL);

	const base = `https://${host}/`;
	const url = new URL(`${collection}.json?icons=${icons.toString()}`, base);
	console.log(url.toString());
	url.searchParams.sort();
	return url;
}

// main //
const fetchIconifyIcon = (
	specifier: IconifySpecifier,
	attempt = 0,
): IconifyData => {
	// check cache
	const [collection, icon] = specifier.split(":");
	const hit = getCacheIcon(collection, icon);
	if (hit) return hit;

	// make api call
	const uri = getUri({ collection, icons: [icon], api: attempt });
	const response = fetch(uri, ICONIFY_CONFIGURATION.REQUEST_OPTIONS)
		.then(async (res) => {
			if (!res.ok)
				console.error(
					`[solid-iconify] ERROR - Iconify API bad response ${res.status}\n${res}`,
				);
			const json = (await res.json()) as IconifyJSON;
			console.log(collection, icon, json);
			let body = json.icons[icon].body;
			if (ICONIFY_CONFIGURATION.SANITIZE) body = await sanitizeHtml(body);
			if (!body || body.length === 0)
				console.error("[solid-iconify] ERROR - empty svg");
			return body;
		})
		.finally(() => setCacheIcon(collection, icon, response))
		.catch((e) => {
			console.error(
				`[solid-iconify] ERROR - fetching from Iconify API (${uri})\n${e}`,
			);
			const apiList = ICONIFY_CONFIGURATION.ICONIFY_API;
			const fallbacksAvailable = Array.isArray(apiList);
			if (fallbacksAvailable && attempt + 1 < apiList.length)
				return new Promise((r) => setTimeout(r, 500)).then(() =>
					fetchIconifyIcon(specifier, attempt + 1),
				);
			delCacheIcon(collection, icon);
			return Promise.reject(e);
		});

	setCacheIcon(collection, icon, response);
	return response;
};

export default fetchIconifyIcon;
