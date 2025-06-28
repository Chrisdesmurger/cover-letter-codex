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
- **Supabase** (PostgreSQL) + **Prisma ORM**
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
2. Copy `.env.example` to `.env` and fill in the required variables, including your Supabase project URL and keys.
3. Run database migrations using your Supabase connection string:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables
See `.env.example` for all necessary environment variables such as the Supabase connection string and API keys, OpenAI key, and Stripe keys.

## Prisma
Prisma schema is located in `prisma/schema.prisma`. Adjust models as needed and run migrations.

## License
MIT
