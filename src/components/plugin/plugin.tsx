import { ChevronRight } from "lucide-react";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import type { PluginEntry } from "~/types/protoRegistry";

import { AuthorBadge } from "./author-badge";
import { CopyField } from "./copy-field";
import { DevIcon } from "./dev-icon";
import { FormatBadge } from "./format-badge";
import { LinkButton } from "./link-button";

function HeaderContent({ plugin }: { plugin: PluginEntry }) {
	return (
		<span className="flex">
			<DevIcon className="pr-2 pt-2" plugin={plugin} />
			<span>
				<CardTitle>{plugin.name}</CardTitle>
				<CardDescription>{plugin.description}</CardDescription>
				<CardDescription className="flex flex-wrap gap-1 pt-2">
					<AuthorBadge author={plugin.author} />
					<FormatBadge format={plugin.format} />
				</CardDescription>
			</span>
		</span>
	);
}

function HeaderAction({ plugin }: { plugin: PluginEntry }) {
	return (
		<CardAction className="flex flex-wrap gap-1">
			{plugin.repositoryUrl && (
				<LinkButton url={plugin.repositoryUrl} type="repo"></LinkButton>
			)}
			{plugin.homepageUrl && (
				<LinkButton url={plugin.homepageUrl} type="home"></LinkButton>
			)}
		</CardAction>
	);
}

function BinsList({ bins }: { bins: string[] }) {
	return (
		<div className="flex flex-wrap gap-1 items-center pt-2">
			<ChevronRight />
			{bins.map((bin) => (
				<pre className="pt-1 pr-5" key={bin}>
					{bin}
				</pre>
			))}
		</div>
	);
}

export function Plugin({ plugin }: { plugin: PluginEntry }) {
	return (
		<Card key={plugin.id} className="justify-between">
			<CardHeader>
				<HeaderContent plugin={plugin} />
				<HeaderAction plugin={plugin} />
			</CardHeader>
			<CardContent>
				<CopyField
					copyText={`proto plugin add ${plugin.id} ${plugin.locator}`}
				/>
				<BinsList bins={plugin.bins} />
			</CardContent>
		</Card>
	);
}
