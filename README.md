# Cover Letter Codex

A web application to generate personalized cover letters based on a user's CV and a specific job offer.

## Features
- Upload CVs and extract summaries using OCR if needed.
- Upload or scan job offers to extract requirements.
- Short questionnaire to tailor motivation.
- Generate letters in multiple languages using OpenAI GPT.
- User review and feedback system.
- Profile photos and multilingual interface.
- Subscription plans with usage quotas via Stripe.

## Tech Stack
- **Next.js** + **React** + **Tailwind CSS** + **TypeScript**
- **OpenAI GPT** for text generation
- **next-i18next** for i18n
- **next-auth** (placeholder) for authentication
- **Stripe** for payments
- **Tesseract.js** for OCR parsing

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

Copy `.env.example` to `.env` and set the variables. Provide your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Supabase dashboard.

## Supabase
The app uses [Supabase](https://supabase.com/) for data storage. Configure your project keys in the environment variables.

## License
MIT
