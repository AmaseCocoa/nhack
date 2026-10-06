import app from "@nhack-app/api";
import { createFileRoute } from "@tanstack/react-router";

const fetch = async (request: Request) => await app.fetch(request);

export const Route = createFileRoute("/api/$")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				return await fetch(request);
			},
			POST: async ({ request }) => {
				return await fetch(request);
			},
			PUT: async ({ request }) => {
				return await fetch(request);
			},
			DELETE: async ({ request }) => {
				return await fetch(request);
			},
			PATCH: async ({ request }) => {
				return await fetch(request);
			},
			OPTIONS: async ({ request }) => {
				return await fetch(request);
			},
		},
	},
});
