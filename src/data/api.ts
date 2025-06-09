import type { IconifyJSON } from "@iconify/types";
import { delCacheIcon, getCacheIcon, setCacheIcon } from "~/data/cache";
import { ICONIFY_CONFIGURATION } from "~/data/config";
import type { IconifyData, IconifySpecifier } from "~/types";
import { sanitizeHtml } from "../lib/sanitization";

// TODO: queue then bundle icons into 1 request to API

// helpers //
function validate(u: string | URL): string {
	let s = u instanceof URL ? u.href : u.trim();
	s = /^[a-zA-Z][\w+.-]*:/.test(s)
		? s.replace(/^([a-zA-Z][\w+.-]*:)(?!\/\/)/, "$1//")
		: `https://${s}`;
	let url: URL;
	try {
		url = new URL(s);
	} catch {
		url = new URL(`https://${s.replace(/^([a-zA-Z][\w+.-]*:)?\/?\/?/, "")}`);
	}
	const p = url.pathname.replace(/^\/|\/$/g, "");
	return url.host.toLowerCase() + (p ? `/${p}` : "");
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
		host = validate(src[api % src.length]);
	} else host = validate(src as string | URL);

	const base = `https://${host}/`;
	const url = new URL(`${collection}.json?icons=${icons.toString()}`, base);
	url.searchParams.sort();
	return url;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function retry<T>(
	task: () => Promise<T>,
	attempts = 3,
	delayMs = 100,
): Promise<T> {
	return task().catch((err) => {
		if (attempts <= 0) throw err;
		return delay(delayMs).then(() => retry(task, attempts - 1, delayMs * 2));
	});
}

// main //
function fetchIconifyIcon(
	specifier: IconifySpecifier,
	attempt = 0,
): Promise<IconifyData> {
	// check cache
	const [collection, icon] = specifier.split(":");
	const hit = getCacheIcon(collection, icon);
	if (hit) return hit;

	// make api call
	const uri = getUri({ collection, icons: [icon], api: attempt });
	const task = retry(() =>
		fetch(uri, ICONIFY_CONFIGURATION.REQUEST_OPTIONS).then(async (res) => {
			if (!res.ok)
				throw Error(
					`[solid-iconify] ERROR - Iconify API bad response ${res.status}\n${res}`,
				);
			const json = (await res.json()) as IconifyJSON;
			let body = Object.values(json.icons).pop()?.body;
			if (!body || body.length === 0)
				throw Error("[solid-iconify] ERROR - Invalid SVG (empty / undefined)");
			if (ICONIFY_CONFIGURATION.SANITIZE) body = await sanitizeHtml(body);

			const data = {
				vBox: [
					json.left ?? 0,
					json.top ?? 0,
					json.width ?? 24,
					json.height ?? 24,
				],
				body,
			};

			setCacheIcon(collection, icon, Promise.resolve(data));
			return data;
		}),
	).catch(async (err) => {
		console.error(
			`[solid-iconify] ERROR - fetching from Iconify API (${uri})\n${err}`,
		);
		const apis = ICONIFY_CONFIGURATION.ICONIFY_API;
		const next = attempt + 1;
		if (Array.isArray(apis) && next < apis.length)
			return fetchIconifyIcon(specifier, next);
		delCacheIcon(collection, icon);
		throw err; // total failure
	});

	setCacheIcon(collection, icon, task);
	return task;
}

export default fetchIconifyIcon;
