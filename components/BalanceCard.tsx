import Avatar from "@/components/Avatar";

type BalanceCardProps = {
  name: string;
  email: string;
  balance: number;
};

export default function BalanceCard({
  name,
  email,
  balance,
}: BalanceCardProps) {
  const isPositive = balance >= 0;

  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        p-5
        shadow-lg
        hover:shadow-xl
        transition
        duration-200
        flex
        items-center
        justify-between
      "
    >
      <div className="flex items-center gap-4">
        <Avatar name={name} />

        <div>
          <h3 className="text-white font-semibold text-lg">
            {name}
          </h3>

          <p className="text-slate-400 text-sm">
            {email}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-slate-400 text-sm">
          Balance
        </p>

        <h2
          className={`text-2xl font-bold ${
            isPositive
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          ₹{balance}
        </h2>
      </div>
    </div>
  );
}