const buildURL = (
	{ icon: specifier, ...rest }: IconifyApiParams,
	api: string,
): [string, URL] => {
	const [collection, name] = specifier.split(":");
	if (!collection || !name) throw Error("Iconify: bad specifier");

	const url = new URL(`${collection}/${name}.svg`, `https://${api}/`);
	for (const [k, v] of Object.entries(rest))
		v != null && url.searchParams.set(k, String(v));
	url.searchParams.sort();
	return [specifier, url];
};

const fetchIconifyIcon = (
	params: IconifyApiParams,
	apiUri: string,
	attempt = 0,
): Promise<IconData> => {
	const [spec, url] = buildURL(params, apiUri);
	const cacheKey = `${spec} [${url.searchParams.toString() ?? "-"}]`;
	const hit = cache?.get(cacheKey);
	if (hit) return hit;

	const task = fetch(url, CONFIGURATION.REQUEST_OPTIONS)
		.then(async (res) => {
			if (!res.ok) throw Error(`Iconify ${res.status}`);

			let raw = await res.text();
			if (!raw || raw.length === 0) throw Error("Iconify: empty SVG");
			if (CONFIGURATION.SANITIZE) {
				if (!sanitizeHtml) await ensureSanitize();
				raw = escapeHTML(sanitizeHtml(raw));
				console.log("here");
				if (!raw || raw.length === 0) throw Error("Iconify: empty SVG");
			}

			if (!domParser) await ensureDOM();
			const svgEl = domParser.parseFromString(
				raw,
				"image/svg+xml",
			).documentElement;
			if (svgEl.nodeName !== "svg") throw Error("Iconify: invalid SVG");

			return {
				attributes: {
					...CONFIGURATION.DEFAULT_SVG_ATTRIBUTES,
					...normalizeAttributes(svgEl.attributes),
				},
				vector: getInnerHtml(raw),
			} as IconData;
		})
		.finally(() => cache?.set(cacheKey, task))
		.catch((e) => {
			if (FALLBACKS && attempt + 1 < CONFIGURATION.ICONIFY_API.length) {
				const nextApi =
					CONFIGURATION.ICONIFY_API[
						(attempt + 1) % CONFIGURATION.ICONIFY_API.length
					];
				return new Promise((r) => setTimeout(r, 500)).then(() =>
					fetchIconifyIcon(params, nextApi, attempt + 1),
				);
			}
			cache?.delete(cacheKey);
			return Promise.reject(e);
		});

	return task;
};
