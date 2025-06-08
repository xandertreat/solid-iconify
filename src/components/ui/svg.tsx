import { Match, Switch, mergeProps, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { ICONIFY_CONFIGURATION } from "~/data/config.js";

export default function SVGWrapper(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
	const [local, rest] = splitProps(
		mergeProps(ICONIFY_CONFIGURATION.DEFAULT_SVG_ATTRIBUTES, props),
		["children"],
	);

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg {...rest}>
			<Switch>
				<Match when={typeof ICONIFY_CONFIGURATION.SVG_TITLE === "string"}>
					<title>{ICONIFY_CONFIGURATION.SVG_TITLE}</title>
				</Match>
				<Match when={ICONIFY_CONFIGURATION.SVG_TITLE === true}>
					<title>Icon</title>
				</Match>
			</Switch>
			{local.children}
		</svg>
	);
}
