type SummaryCardProps = {
  title: string;
  value: string | number;
};

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-md p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}