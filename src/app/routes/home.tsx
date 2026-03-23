import { Plugin } from "~/components/plugin";
import type { PluginEntry } from "~/types/protoRegistry";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "Proto Plugins" },
		{ name: "description", content: "List of all available Proto Plugins" },
	];
}

export async function clientLoader() {
	const res = await fetch(
		`${import.meta.env.VITE_URL_BASE}/data/third-party.json`,
	);
	const manifest: { plugins: PluginEntry[] } = await res.json();

	return manifest.plugins;
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const plugins = loaderData;

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="grid auto-rows-min gap-4 md:grid-cols-2 sm:grid-cols-1">
				{plugins.map((plugin, _index) => (
					<Plugin
						key={`${plugin.id}-${plugin.author}-${plugin.name}`}
						plugin={plugin}
					></Plugin>
				))}
			</div>
		</div>
	);
}
