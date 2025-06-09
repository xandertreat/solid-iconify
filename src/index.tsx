import { createResource, splitProps } from "solid-js";
import fetchIconifyIcon from "~/data/api";
import type { IconifyIconProps } from "~/types";

export default function Icon(props: IconifyIconProps) {
	const [local, rest] = splitProps(props, ["icon"]);
	const [data] = createResource(
		() => local.icon,
		() => fetchIconifyIcon(local.icon),
	);
	return (
		<svg
			height={data()?.vBox[3] ?? 24}
			innerHTML={data()?.body}
			viewBox={data()?.vBox.join(" ") ?? "0 0 24 24"}
			width={data()?.vBox[2] ?? 24}
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		/>
	);
}
export { configureIconify } from "./data/config";
export type * from "./types";
