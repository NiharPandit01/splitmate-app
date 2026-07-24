import Avatar from "@/components/Avatar";

type ExpenseCardProps = {
  title: string;
  amount: number;
  paidBy: string;
  participantCount: number;
};

export default function ExpenseCard({
  title,
  amount,
  paidBy,
  participantCount,
}: ExpenseCardProps) {
  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        shadow-lg
        p-5
        hover:shadow-xl
        transition
        duration-200
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <div className="flex items-center gap-3 mt-4">
            <Avatar name={paidBy} size="sm" />

            <div>
              <p className="text-slate-400 text-sm">
                Paid By
              </p>

              <p className="text-white font-medium">
                {paidBy}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-slate-400 text-sm">
            Amount
          </p>

          <h2 className="text-2xl font-bold text-green-400">
            ₹{amount}
          </h2>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-700 pt-4">
        <p className="text-slate-400">
          👥 {participantCount} Participants
        </p>
      </div>
    </div>
  );
}