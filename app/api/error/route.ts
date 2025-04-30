import { NextResponse } from 'next/server'
import { PostHog } from 'posthog-node'

const client = new PostHog('YOUR_PROJECT_API_KEY', {
    host: 'https://app.posthog.com',
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        client.capture({
            distinctId: body.user || 'anonymous',
            event: 'backend_error',
            properties: {
                message: body.message,
                stack: body.stack,
                endpoint: body.endpoint,
            },
        })
        return NextResponse.json({ status: 'logged' })
    } catch (err) {
        return NextResponse.json({ status: 'error', error: err })
    }
}
