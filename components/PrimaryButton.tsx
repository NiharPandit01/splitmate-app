type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function PrimaryButton({
  children,
  onClick,
  type = "submit",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-semibold
        px-6
        py-3
        rounded-xl
        transition
        duration-200
        shadow-md
        hover:shadow-lg
      "
    >
      {children}
    </button>
  );
}