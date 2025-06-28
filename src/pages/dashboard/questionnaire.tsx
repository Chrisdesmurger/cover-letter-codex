import { useState } from 'react';

export default function Questionnaire() {
  const [motivation, setMotivation] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Answers saved');
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold mb-4">Questionnaire</h1>
      <textarea
        className="border p-2 w-full"
        rows={3}
        placeholder="Why do you want this job?"
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        rows={3}
        placeholder="What skills make you a good fit?"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">
        Save
      </button>
    </form>
  );
}
