import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';

// Simple parser that fetches the HTML of a job offer URL and extracts
// basic information (title, company, description).
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { url } = req.body as { url: string };
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim() || $('title').text().trim();
    const company =
      $('meta[property="og:site_name"]').attr('content') || '';
    const description =
      $('meta[name="description"]').attr('content') || $('p').text();

    res.status(200).json({ title, company, description });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch job offer' });
  }
}
