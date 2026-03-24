import { GitBranch, House } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";

interface LinkButtonProps {
	url: string;
	type: "home" | "repo";
}

export function LinkButton({ url: repositoryUrl, type }: LinkButtonProps) {
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
