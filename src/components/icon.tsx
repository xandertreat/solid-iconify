import { createAsync } from "@solidjs/router"; // TODO: remove dep. for solid 2.0
import {
	ErrorBoundary,
	Show,
	Suspense,
	mergeProps,
	splitProps,
} from "solid-js";
import type { Component, JSX } from "solid-js";
import { ICONIFY_CONFIGURATION } from "~/data/config";
import LoadingFallback from "./loading";
import ErrorFallback from "./error";

export const Icon: Component<IconifyIconProps> = (raw) => {
	const props = mergeProps(
		{
			showLoading: ICONIFY_CONFIGURATION.SHOW_LOADING_DEFAULT,
			showError: ICONIFY_CONFIGURATION.SHOW_ERROR_DEFAULT,
		},
		raw,
	);
	const [visibility, _] = splitProps(props, ["showLoading", "showError"]);
	const [apiParams, rest]: [
		IconifyApiParams,
		JSX.SvgSVGAttributes<SVGSVGElement>,
	] = splitProps(_, [
		"icon",
		"color",
		"size",
		"flip",
		"rotate",
		"download",
		"box",
	]);

	if (typeof apiParams.size === "number") {
		rest.width = `${apiParams.size}em`;
		rest.height = `${apiParams.size}em`;
		apiParams.size = undefined;
	}

	const api = FALLBACKS
		? ICONIFY_CONFIGURATION.ICONIFY_API[0]
		: (ICONIFY_CONFIGURATION.ICONIFY_API as string);

	const data = createAsync(() => fetchIconifyIcon(apiParams, api), {
		name: `[solid-iconify-resource] ${props.icon}`,
		initialValue: undefined,
		deferStream: false,
	});

	return (
		<Suspense
			fallback={
				<LoadingFallback loadingIcon={visibility.showLoading} {...rest} />
			}
		>
			<ErrorBoundary
				fallback={<ErrorFallback errorIcon={visibility.showError} {...rest} />}
			>
				<Show
					fallback={
						<LoadingFallback loadingIcon={visibility.showLoading} {...rest} />
					}
					when={data()}
				>
					{(data) => (
						<svg {...data().attributes} {...rest} innerHTML={data().vector} />
					)}
				</Show>
			</ErrorBoundary>
		</Suspense>
	);
};

// TODO: shrink size down further, use json API + allow params but do it in JS (not a req)
// TODO: better host list handling (i.e. multiple attempts for 1, managing their status, delays between errors etc, as well as parsing)
// TODO: configuration consistent / stable (i.e. configuration always runs before any rendering / reading of config)
