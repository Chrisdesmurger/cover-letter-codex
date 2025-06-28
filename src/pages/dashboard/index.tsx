import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { supabase } from '../../lib/supabaseClient';

interface DashboardProps {
  generationCount: number;
}

export default function Dashboard({ generationCount }: DashboardProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Letters generated: {generationCount}</p>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/upload-cv" className="underline">
            Upload CV
          </Link>
        </li>
        <li>
          <Link href="/dashboard/upload-job" className="underline">
            Upload Job Offer
          </Link>
        </li>
        <li>
          <Link href="/dashboard/questionnaire" className="underline">
            Questionnaire
          </Link>
        </li>
        <li>
          <Link href="/dashboard/generator" className="underline">
            Generate Letter
          </Link>
        </li>
      </ul>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  let generationCount = 0;
  const userId = session?.user?.id as string | undefined;
  if (userId) {
    const { data } = await supabase
      .from('users')
      .select('generation_count')
      .eq('id', userId)
      .single();
    generationCount = data?.generation_count ?? 0;
  }

  return { props: { generationCount } };
}
