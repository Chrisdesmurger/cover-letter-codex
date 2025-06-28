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

Copy `.env.example` to `.env` and set the variables. Provide your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Supabase dashboard. Also define `NEXTAUTH_SECRET` with any random string for signing authentication tokens.

## Supabase
The app uses [Supabase](https://supabase.com/) for data storage. Configure your project keys in the environment variables.

### Database initialization
Create the required tables using the SQL script in `supabase/init.sql`. You can run it from the SQL editor in the Supabase dashboard or via `psql`:

```bash
psql "$SUPABASE_URL" -f supabase/init.sql
```

In the storage section of your Supabase project, create a bucket named `documents` for uploaded files.

## License
MIT
