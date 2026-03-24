import useCopy from "@react-hook/copy";
import { Check, Copy } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";

interface CopyFieldProps {
	copyText: string;
}

export function CopyField({ copyText }: CopyFieldProps) {
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
