import { createAsync } from "@solidjs/router"; // TODO: remove dep. for solid 2.0
import {
	ErrorBoundary,
	Show,
	Suspense,
	createMemo,
	mergeProps,
	splitProps,
} from "solid-js";
import ErrorFallback from "~/components/fallbacks/error";
import LoadingFallback from "~/components/fallbacks/loading";
import SVGWrapper from "~/components/ui/svg";
import fetchIconifyIcon from "~/lib/api";
import type { IconifyIconProps } from "~/types/global";
import { toSpecifier } from "~/types/guards";

export default function Icon(props: IconifyIconProps) {
	const [local, rest] = splitProps(
		mergeProps(
			{
				showLoading: false,
				showError: false,
			},
			props,
		),
		["icon", "showLoading", "showError", "flip", "rotate", "box"],
	);

	const specifier = createMemo(() => toSpecifier(local.icon));

	const data = createAsync(() => fetchIconifyIcon(specifier()));

	return (
		<ErrorBoundary
			fallback={<ErrorFallback errorIcon={local.showError} {...rest} />}
		>
			<Suspense
				fallback={<LoadingFallback loadingIcon={local.showLoading} {...rest} />}
			>
				<Show
					fallback={
						<LoadingFallback loadingIcon={local.showLoading} {...rest} />
					}
					when={data()}
				>
					{(data) => <SVGWrapper {...rest} innerHTML={data()} />}
				</Show>
			</Suspense>
		</ErrorBoundary>
	);
}
