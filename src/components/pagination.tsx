import { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";

export default function PaginationElem({
	itemCount,
	total,
	onPageChange,
}: {
	itemCount: number;
	total: number;
	onPageChange: (nextPage: number) => void;
}) {
	const numPages = Math.floor(total / itemCount);

	const [page, updatePage] = useState<number>(0);

	const pageChangeEvent = (direction: "prev" | "next") => {
		return () => {
			let nextPage = page;
			if (direction === "prev") {
				nextPage -= 1;
			}

			if (direction === "next") {
				nextPage += 1;
			}

			updatePage(nextPage);
			onPageChange(nextPage);
		};
	};

	return (
		<Pagination className="mx-0 w-auto">
			<PaginationContent>
				<PaginationItem>
					{page === 0 ? (
						<PaginationPrevious className={"pointer-events-none opacity-50"} />
					) : (
						<PaginationPrevious onClick={pageChangeEvent("prev")} />
					)}
				</PaginationItem>
				<PaginationItem>
					{page === numPages ? (
						<PaginationNext className={"pointer-events-none opacity-50"} />
					) : (
						<PaginationNext onClick={pageChangeEvent("next")} />
					)}
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
