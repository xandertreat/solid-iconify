import { mergeProps, Show, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";

import { ICONIFY_CONFIGURATION } from "~/data/config.js";

const SVGWrapper: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => {
	const [local, rest] = splitProps(props, ["children"]);
	const attributes = mergeProps(
		ICONIFY_CONFIGURATION.DEFAULT_SVG_ATTRIBUTES,
		rest,
	);

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: Up to end user
		<svg {...attributes}>
			<Show when={ICONIFY_CONFIGURATION.SVG_TITLE}>
				<title>Icon</title>
			</Show>
			{local.children}
		</svg>
	);
};

export default SVGWrapper;
