
const API_HOST = "us.i.posthog.com" // Change to "eu.i.posthog.com" for EU
const ASSET_HOST = "us-assets.i.posthog.com" // Change to "eu-assets.i.posthog.com" for EU

async function handleRequest(request: Request, ctx: ExecutionContext) {
	const url = new URL(request.url)
	const pathname = url.pathname
	const search = url.search
	const pathWithParams = pathname + search

	if (pathname.startsWith("/static/")) {
		return retrieveStatic(request, pathWithParams, ctx)
	} else {
		return forwardRequest(request, pathWithParams)
	}
}

async function retrieveStatic(request: Request, pathname: string, ctx: ExecutionContext) {
	let response = await caches.default.match(request)
	if (!response) {
		response = await fetch(`https://${ASSET_HOST}${pathname}`)
		ctx.waitUntil(caches.default.put(request, response.clone()))
	}
	return response
}

async function forwardRequest(request: Request, pathWithSearch: string) {
	const originRequest = new Request(`https://${API_HOST}${pathWithSearch}`, {
		method: request.method,
		headers: new Headers({
			...Object.fromEntries(request.headers),
			'Host': API_HOST // best practice
		}),
		body: request.body,
		redirect: 'manual',
	})

	originRequest.headers.delete("cookie")

	return await fetch(originRequest)
}


export default {
	async fetch(request, env, ctx): Promise<Response> {
		return handleRequest(request, ctx);
	},
} satisfies ExportedHandler<Env>;
