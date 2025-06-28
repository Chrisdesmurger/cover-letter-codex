interface BalanceCardProps {
  remaining: number;
}

export default function BalanceCard({ remaining }: BalanceCardProps) {
  return (
    <div className="bg-white shadow rounded p-4">
      <p className="text-sm text-gray-500">Remaining Credits</p>
      <p className="text-2xl font-bold text-violet-600">{remaining}</p>
    </div>
  );
}
