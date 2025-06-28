import { useState } from 'react';

export default function Generator() {
  const [cvSummary, setCvSummary] = useState('');
  const [jobOffer, setJobOffer] = useState('');
  const [answers, setAnswers] = useState('');
  const [language, setLanguage] = useState('en');
  const [letter, setLetter] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/generate-letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cvSummary, jobOffer, answers, language }),
    });
    const data = await res.json();
    setLetter(data.letter || data.error || 'Failed to generate');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Generate Letter</h1>
      <form className="space-y-4" onSubmit={handleGenerate}>
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
