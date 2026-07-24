import Avatar from "@/components/Avatar";
import PrimaryButton from "@/components/PrimaryButton";

type MemberCardProps = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  showRemove: boolean;
  onRemove?: (id: string) => void;
};

export default function MemberCard({
  id,
  name,
  email,
  isAdmin,
  showRemove,
  onRemove,
}: MemberCardProps) {
  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        shadow-lg
        p-6
        hover:shadow-xl
        transition
        duration-200
      "
    >
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-4">

          <Avatar
            name={name}
            size="md"
          />

          <div>

            <h2 className="text-xl font-bold text-white">
              {name}
            </h2>

            <p className="text-slate-400 mt-1">
              {email}
            </p>

            <div className="mt-3">

              {isAdmin ? (

                <span
                  className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-yellow-500/20
                    text-yellow-300
                    text-sm
                    font-semibold
                  "
                >
                  👑 Admin
                </span>

              ) : (

                <span
                  className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-slate-700
                    text-slate-300
                    text-sm
                  "
                >
                  Member
                </span>

              )}

            </div>

          </div>

        </div>

        {showRemove && (
          <PrimaryButton
            type="button"
            onClick={() => onRemove?.(id)}
          >
            Remove
          </PrimaryButton>
        )}

      </div>
    </div>
  );
}