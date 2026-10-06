import { Breadcrumbs } from "#/components/Breadcrumbs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return <main className="page-wrap px-4 pb-8 pt-6">
		<Breadcrumbs detail={{
			title: 'Overview',
			href: '/'
		}} items={[]} />
	</main>;
}
