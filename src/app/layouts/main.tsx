export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header></header>
			<main className="">{children}</main>
			<footer></footer>
		</>
	);
}
