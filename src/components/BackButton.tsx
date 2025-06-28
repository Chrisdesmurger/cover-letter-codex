import Link from 'next/link';

/** Accessible back button used across all pages */
export default function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="inline-flex items-center text-blue-600 hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 mb-4"
    >
      {/* simple left arrow */}
      <span aria-hidden="true" className="mr-1">&larr;</span>
      <span>Back</span>
    </Link>
  );
}
