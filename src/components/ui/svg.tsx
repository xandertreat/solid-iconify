import { Match, mergeProps, splitProps, Switch } from "solid-js";
import type { Component, JSX } from "solid-js";

import { ICONIFY_CONFIGURATION } from "~/data/config.js";

const SVGWrapper: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => {
	const [local, rest] = splitProps(props, ["children"]);
	const attributes = mergeProps(
		ICONIFY_CONFIGURATION.DEFAULT_SVG_ATTRIBUTES,
		rest,
	);

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg {...attributes}>
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
};

export default SVGWrapper;
