// posthog.config.ts
import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (typeof window !== 'undefined' && POSTHOG_KEY && !posthog.__loaded) {
    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        ui_host: "us.i.posthog.com",
        autocapture: true,
        capture_pageview: true,
        loaded: (ph) => {
            console.log('✅ PostHog loaded:', ph)
        },
    })
}

export default posthog