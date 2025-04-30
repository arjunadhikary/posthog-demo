# 🧠 PostHog + Next.js 15 Demo

> This is a demo project showcasing how to use PostHog with the Next.js 15 App Router, including key features like:

- Product analytics with autocapture
- Setting up reverse proxy
- Session replay
- Product analytics with autocapture
- Session replay
- Feature flags
- Error tracking with source maps

Hosted on Vercel, and deployed with CI/CD pipelines supporting source map uploads for full PostHog error traceability.
flags

🚀 Stack

- Next.js 15.3.1
- React 19
- Tailwind CSS 4.1.4
- PostHog for analytics + error tracking
- NextAuth.js for authentication
- TypeScript 5

---

## ✨ Features

- 🔐 **Auth**: Uses NextAuth.js with GitHub and Google sign-in. Authenticated users are redirected to /dashboard.
- ✅ **App Router-ready**: Uses Next.js 15’s latest features (App Router, Server Components, Suspense).
- 🎯 **PostHog Autocapture**: Tracks events automatically with zero config.
- 📹 **Session Replay**: Replays user sessions to see exactly what users did.
- 🚩 **Feature Flags**: Gradual rollout using PostHog feature flags.
- 🐛 **Error Monitoring**: Integrated with PostHog to catch both client and server errors.
- 🧠 **Sourcemaps Support**: Upload sourcemaps in CI/CD for de-minified stack traces.
- 🔄 **Reverse Proxy Support**: Seamlessly integrates with reverse proxy setups, including Cloudflare and Next.js middleware, for enhanced routing and traffic management.

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/posthog-nextjs-demo.git
cd posthog-nextjs-demo
npm install
```

Add a `.env.local` file with the following keys:

```env
POSTHOG_PROJECT_API_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXTAUTH_SECRET=your_generated_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start your local server:

```bash
npm run dev
```

---

## 🛠️ CI/CD Environment Variables

To successfully run the GitHub Actions workflow for this project, make sure the following secrets are defined in your repository settings:

| Variable Name           | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID for deploying to Workers                  |
| `CLOUDFLARE_API_TOKEN`  | API token with necessary permissions for Cloudflare deployments |
| `POSTHOG_API_KEY`       | API key for authenticating PostHog CLI                          |
| `POSTHOG_CLI_ENV_ID`    | PostHog environment ID (visible in the PostHog dashboard URL)   |
| `POSTHOG_CLI_TOKEN`     | Personal API token for PostHog CLI                              |
| `VERCEL_ORG_ID`         | Vercel organization ID                                          |
| `VERCEL_PROJECT_ID`     | Vercel project ID                                               |
| `VERCEL_TOKEN`          | Vercel access token for deploying via CLI                       |

These variables ensure smooth deployment and source map uploading to PostHog for error tracking and session replay.

## 🔧 CI/CD + Sourcemaps

This project includes CI steps for uploading sourcemaps to PostHog:

```yaml
- name: Install PostHog CLI
  run: |
    curl --proto '=https' --tlsv1.2 -LsSf https://github.com/PostHog/posthog/releases/download/posthog-cli-v0.0.4/posthog-cli-installer.sh | sh

- name: Upload source maps to PostHog
  run: |
    export POSTHOG_CLI_ENV_ID=your_env_id
    export POSTHOG_CLI_TOKEN=your_posthog_token
    posthog-cli sourcemap inject --directory .next
    posthog-cli sourcemap upload --directory .next
```

---

## 📸 Screenshots

_Add screenshots here: login screen, dashboard, error tracking view, etc._

---

## 🛟 Troubleshooting

- `NO_SECRET`: Define `NEXTAUTH_SECRET` in `.env.local`.
- Sourcemaps not working? Ensure proper directory structure and CLI upload setup.

---

## 📜 License

MIT — Open Source. Fork it, use it, improve it.
