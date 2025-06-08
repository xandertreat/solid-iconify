import { type JSX, Show } from "solid-js";

import SVGWrapper from "~/components/ui/svg.jsx";

interface LoadingFallbackProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
	loadingIcon: boolean;
}

export default function LoadingFallback(props: LoadingFallbackProps) {
	return (
		<Show fallback={<SVGWrapper {...props} />} when={props.loadingIcon}>
			<SVGWrapper {...props}>
				<path
					d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
					fill="currentColor"
					opacity="0.25"
				/>
				<path
					d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
					fill="currentColor"
				>
					<animateTransform
						attributeName="transform"
						dur="0.75s"
						repeatCount="indefinite"
						type="rotate"
						values="0 12 12;360 12 12"
					/>
				</path>
			</SVGWrapper>
		</Show>
	);
}
