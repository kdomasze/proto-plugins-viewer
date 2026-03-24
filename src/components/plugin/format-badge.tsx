import { BookType } from "lucide-react";
import { Badge } from "~/components/ui/badge";

interface FormatBadgeProps {
	format: string;
}

export function FormatBadge({ format }: FormatBadgeProps) {
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
