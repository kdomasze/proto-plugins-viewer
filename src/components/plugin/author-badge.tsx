import { User } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import type { PluginAuthor } from "~/types/protoRegistry";

interface AuthorBadgeProps {
	author: PluginAuthor;
}

export function AuthorBadge({ author }: AuthorBadgeProps) {
	const name = typeof author === "string" ? author : author.name;
	return (
		<Badge>
			<User data-icon="inline-start" /> {name}
		</Badge>
	);
}
