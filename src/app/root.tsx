import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import { ThemeProvider } from "~/components/theme-provider";

import type { Route } from "./+types/root";
import "./app.css";
import "~/styles/globals.css";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
					<header className="bg-background mb-8">
						<div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6">
							<nav className="w-full flex items-center h-fit justify-between">
								<a href="/" className="text-2xl font-bold">
									Proto Plugins
								</a>
								<div className="flex items-center gap-2">
									<a href="https://github.com/kdomasze/proto-plugins">
										<Button variant="outline" size="icon">
											<i className="devicon-github-original"></i>
										</Button>
									</a>
									<ModeToggle />
								</div>
							</nav>
						</div>
					</header>
					<main>{children}</main>
					<footer></footer>
				</ThemeProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function HydrateFallback() {
	return <div>Loading...</div>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
