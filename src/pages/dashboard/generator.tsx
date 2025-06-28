import { useState } from 'react';
import BackButton from '../../components/BackButton';

export default function Generator() {
  const [cvSummary, setCvSummary] = useState('');
  const [jobOffer, setJobOffer] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [answers, setAnswers] = useState('');
  const [language, setLanguage] = useState('en');
  const [letter, setLetter] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/generate-letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cvSummary,
        jobOffer: `${jobTitle} ${company}\n${jobOffer}`,
        answers,
        language,
      }),
    });
    const data = await res.json();
    setLetter(data.letter || data.error || 'Failed to generate');
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-xl font-bold mb-4">Generate Letter</h1>
      <form className="space-y-4" onSubmit={handleGenerate}>
        <input
          className="border p-2 w-full"
          placeholder="Job offer URL"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          onBlur={async () => {
            if (!jobUrl) return;
            const res = await fetch('/api/parse-job', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: jobUrl }),
            });
            const data = await res.json();
            if (data.title) setJobTitle(data.title);
            if (data.company) setCompany(data.company);
            if (data.description) setJobOffer((prev) => data.description + '\n' + prev);
          }}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="border p-2 w-full"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            setJobOffer((prev) => prev + '\n' + text);
          }}
        />
        <input
          className="border p-2 w-full"
          placeholder="Job title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          rows={4}
          placeholder="CV summary"
          value={cvSummary}
          onChange={(e) => setCvSummary(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          rows={4}
          placeholder="Job offer text"
          value={jobOffer}
          onChange={(e) => setJobOffer(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          rows={4}
          placeholder="Questionnaire answers"
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Language (e.g. en)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Generate
        </button>
      </form>
      {letter && (
        <div className="mt-4 border p-4 whitespace-pre-wrap">{letter}</div>
      )}
    </div>
  );
}
