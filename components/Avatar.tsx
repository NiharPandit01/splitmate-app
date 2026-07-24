type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
};

export default function Avatar({
  name,
  size = "md",
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        bg-blue-600
        text-white
        flex
        items-center
        justify-center
        font-bold
        shadow-md
      `}
    >
      {initials}
    </div>
  );
}