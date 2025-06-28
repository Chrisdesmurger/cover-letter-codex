import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
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
