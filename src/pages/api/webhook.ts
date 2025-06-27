import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../lib/stripe';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'] as string;
  const buf = await buffer(req);

  try {
    stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  res.json({ received: true });
}
