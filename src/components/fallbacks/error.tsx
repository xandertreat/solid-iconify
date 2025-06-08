import { type JSX, Show } from "solid-js";

import SVGWrapper from "~/components/ui/svg.jsx";

interface ErrorFallbackProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
	errorIcon: boolean;
}
export default function ErrorFallback(props: ErrorFallbackProps) {
	return (
		<Show fallback={<SVGWrapper {...props} />} when={props.errorIcon}>
			<SVGWrapper {...props}>
				<path
					d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-1-4h2V7h-2z"
					fill="currentColor"
				/>
				<circle cx="12" cy="12" fill="none" r="10" stroke="currentColor" />
			</SVGWrapper>
		</Show>
	);
}
