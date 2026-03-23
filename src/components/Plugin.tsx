import {
	BadgeQuestionMark,
	BookType,
	Copy,
	GitBranch,
	User,
} from "lucide-react";
import useCopy from "@react-hook/copy";
import { twMerge } from "tailwind-merge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { ChevronRight } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";
import type { PluginAuthor, PluginEntry } from "~/types/protoRegistry";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function DevIcon({
	plugin,
	className,
}: {
	plugin: PluginEntry;
	className?: string;
}) {
	const iconClass = `devicon-${plugin.devicon}-plain`;

	if (plugin.devicon) {
		return <i className={twMerge(iconClass, "text-4xl", className)}></i>;
	}

	return (
		<BadgeQuestionMark size="40" strokeWidth="1.5" className={className} />
	);
}

function AuthorBadge({ author }: { author: PluginAuthor }) {
	const name = typeof author === "string" ? author : author.name;
	return (
		<Badge>
			<User data-icon="inline-start" /> {name}
		</Badge>
	);
}

function FormatBadge({ format }: { format: string }) {
	if (format === "wasm") {
		return (
			<Badge variant="secondary">
				<i className={`devicon-wasm-original`}></i> {format}
			</Badge>
		);
	}

	return (
		<Badge variant="secondary">
			<BookType data-icon="inline-start" /> {format}
		</Badge>
	);
}

// TODO: pass in name, add install script
// TODO: change copy to check, timeout to change back
function CopyButton() {
	const { copied, copy, reset } = useCopy("test");

	return (
		<HoverCard openDelay={10} closeDelay={100}>
			<HoverCardTrigger asChild>
				<Button variant="outline" size="icon" aria-label="Copy" onClick={copy}>
					<Copy />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent>Copy install command</HoverCardContent>
		</HoverCard>
	);
}

function RepoButton({ repositoryUrl }: { repositoryUrl: string }) {
	return (
		<HoverCard openDelay={10} closeDelay={100}>
			<HoverCardTrigger asChild>
				<Button variant="outline" size="icon" aria-label="Repository Link">
					<a href={repositoryUrl}>
						<GitBranch />
					</a>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent>Open project repo</HoverCardContent>
		</HoverCard>
	);
}

export function Plugin({ plugin }: { plugin: PluginEntry }) {
	return (
		<Card key={plugin.id}>
			<CardHeader>
				<span className="flex">
					<DevIcon className="pr-2 pt-2" plugin={plugin}></DevIcon>
					<span>
						<CardTitle>{plugin.name}</CardTitle>
						<CardDescription>{plugin.description}</CardDescription>
						<CardDescription className="flex flex-wrap gap-1">
							<AuthorBadge author={plugin.author}></AuthorBadge>
							<FormatBadge format={plugin.format}></FormatBadge>
						</CardDescription>
					</span>
				</span>
				<CardAction className="flex flex-wrap gap-1">
					<CopyButton></CopyButton>

					{plugin.repositoryUrl && (
						<RepoButton repositoryUrl={plugin.repositoryUrl}></RepoButton>
					)}
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-wrap gap-1 items-center">
				<ChevronRight />
				{plugin.bins.map((bin, index) => (
					<pre className="pt-1 pr-5" key={bin}>
						{bin}
					</pre>
				))}
			</CardContent>
		</Card>
	);
}
