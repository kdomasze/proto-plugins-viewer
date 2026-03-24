import { BadgeQuestionMark } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { PluginEntry } from "~/types/protoRegistry";

interface DevIconProps {
	plugin: PluginEntry;
	className?: string;
}

export function DevIcon({ plugin, className }: DevIconProps) {
	const iconClass = `devicon-${plugin.devicon}-plain`;

	if (plugin.devicon) {
		return (
			<i className={twMerge(iconClass, "min-w-11 text-4xl", className)}></i>
		);
	}

	return (
		<BadgeQuestionMark
			size="44"
			strokeWidth="1.5"
			className={twMerge("min-w-11", className)}
		/>
	);
}
