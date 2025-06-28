import type { NextApiRequest, NextApiResponse } from 'next';

const ALLOWED_HOSTS = process.env.ALLOWED_JOB_HOSTS?.split(',').map(h => h.trim()).filter(Boolean);

interface CachedEntry {
  content: string;
  timestamp: number;
}

const cache = new Map<string, CachedEntry>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

interface RateInfo {
  count: number;
  timestamp: number;
}

const rateLimit = new Map<string, RateInfo>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { url } = req.body as { url?: string };
  if (!url) return res.status(400).json({ error: 'Missing url' });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid url' });
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return res.status(400).json({ error: 'Invalid protocol' });
  }

  if (ALLOWED_HOSTS && ALLOWED_HOSTS.length && !ALLOWED_HOSTS.includes(parsed.hostname)) {
    return res.status(400).json({ error: 'Hostname not allowed' });
  }

  const now = Date.now();
  const rl = rateLimit.get(url);
  if (rl && now - rl.timestamp < RATE_LIMIT_WINDOW && rl.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  if (rl && now - rl.timestamp < RATE_LIMIT_WINDOW) {
    rl.count++;
  } else {
    rateLimit.set(url, { count: 1, timestamp: now });
  }

  const cached = cache.get(url);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return res.status(200).json({ text: cached.content, cached: true });
  }

  let html: string;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    html = await response.text();
  } catch (err) {
    console.error('Network error:', err);
    return res.status(500).json({ error: 'Failed to fetch URL' });
  }

  try {
    const text = html
      .replace(/<script[^>]*>.*?<\/script>/gis, '')
      .replace(/<style[^>]*>.*?<\/style>/gis, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    cache.set(url, { content: text, timestamp: now });
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Parse error:', err);
    return res.status(500).json({ error: 'Failed to parse HTML' });
  }
}
