import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { cvSummary, jobOffer, answers, language } = req.body as {
    cvSummary: string;
    jobOffer: string;
    answers: string;
    language: string;
  };

  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  try {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id as string | undefined;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: `Generate a cover letter in ${language}` },
        { role: 'user', content: `CV: ${cvSummary}\nJob: ${jobOffer}\nAnswers: ${answers}` },
      ],
    });
    const letter = completion.data.choices[0].message?.content;

    if (userId) {
      const { data } = await supabase
        .from('users')
        .select('generation_count')
        .eq('id', userId)
        .single();
      const current = data?.generation_count ?? 0;
      await supabase
        .from('users')
        .update({ generation_count: current + 1 })
        .eq('id', userId);
    }

    res.status(200).json({ letter });
  } catch (e) {
    res.status(500).json({ error: 'Failed to generate letter' });
  }
}
