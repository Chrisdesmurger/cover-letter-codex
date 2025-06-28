import BackButton from '../../components/BackButton';
import DynamicQuestionnaire from '../../components/DynamicQuestionnaire';

export default function Questionnaire() {
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-xl font-bold mb-4">Questionnaire</h1>
      <DynamicQuestionnaire />
    </div>
  );
}
