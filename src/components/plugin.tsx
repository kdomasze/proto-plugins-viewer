import useCopy from "@react-hook/copy";
import {
	BadgeQuestionMark,
	BookType,
	Check,
	ChevronRight,
	Copy,
	GitBranch,
	House,
	User,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";
import type { PluginAuthor, PluginEntry } from "~/types/protoRegistry";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "./ui/input-group";

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
function CopyField({ copyText }: { copyText: string }) {
	const { copied, copy, reset } = useCopy(copyText);

	const resetTimeout = () => setTimeout(reset, 3000);

	return (
		<InputGroup>
			<InputGroupInput placeholder={copyText} readOnly />
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					aria-label="Copy"
					title="Copy"
					size="icon-xs"
					onClick={() => {
						copy();
						resetTimeout();
					}}
				>
					{copied ? <Check /> : <Copy />}
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}

function LinkButton({
	url: repositoryUrl,
	type,
}: {
	url: string;
	type: "home" | "repo";
}) {
	return (
		<HoverCard openDelay={10} closeDelay={100}>
			<HoverCardTrigger asChild>
				<Button variant="outline" size="icon" aria-label="Repository Link">
					<a href={repositoryUrl}>
						{type === "repo" ? <GitBranch /> : <House />}
					</a>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="text-center w-fit">
				Open project {type}
			</HoverCardContent>
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
						<CardDescription className="flex flex-wrap gap-1 pt-2">
							<AuthorBadge author={plugin.author}></AuthorBadge>
							<FormatBadge format={plugin.format}></FormatBadge>
						</CardDescription>
					</span>
				</span>
				<CardAction className="flex flex-wrap gap-1">
					{plugin.repositoryUrl && (
						<LinkButton url={plugin.repositoryUrl} type="repo"></LinkButton>
					)}
					{plugin.homepageUrl && (
						<LinkButton url={plugin.homepageUrl} type="home"></LinkButton>
					)}
				</CardAction>
			</CardHeader>
			<CardContent>
				<CopyField
					copyText={`proto plugin add ${plugin.id} ${plugin.locator}`}
				></CopyField>
				<div className="flex flex-wrap gap-1 items-center pt-2">
					<ChevronRight />
					{plugin.bins.map((bin) => (
						<pre className="pt-1 pr-5" key={bin}>
							{bin}
						</pre>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
