import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 'motivation',
    text: 'Quelles sont vos motivations principales pour ce poste ?',
    options: [
      'Évolution de carrière',
      'Environnement stimulant',
      'Meilleures conditions',
    ],
  },
  {
    id: 'experience',
    text: "Quel est votre niveau d'expérience ?",
    options: ['Junior', 'Intermédiaire', 'Senior'],
  },
  {
    id: 'domain',
    text: "Dans quel domaine d'activité travaillez-vous ?",
    options: ['Informatique', 'Marketing', 'Finance', 'Autre'],
  },
  {
    id: 'worklife',
    text: 'Quelle est votre priorité pour la relation travail/vie privée ?',
    options: ['Très équilibrée', 'Standard 9-5', "Heures supplémentaires possibles"],
  },
];

export default function DynamicQuestionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (answer: string) => {
    const q = QUESTIONS[step];
    setAnswers((prev) => ({ ...prev, [q.id]: answer }));
    setStep((s) => s + 1);
  };

  if (step >= QUESTIONS.length) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Merci !</h2>
        <pre className="whitespace-pre-wrap">{JSON.stringify(answers, null, 2)}</pre>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div
      key={question.id}
      className="p-4 transition-opacity duration-300 ease-in-out"
    >
      <h2 className="text-lg font-medium mb-4">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className="block w-full text-left border px-4 py-2 rounded hover:bg-blue-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Question {step + 1} / {QUESTIONS.length}
      </div>
    </div>
  );
}
