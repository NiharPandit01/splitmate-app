import Link from "next/link";

type NavbarProps = {
  title?: string;
};

export default function Navbar({
  title = "SplitMate",
}: NavbarProps) {
  return (
    <nav className="bg-white shadow-md rounded-2xl px-8 py-4 mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          {title}
        </h1>
        <p className="text-sm text-gray-500">
          Split expenses effortlessly
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          Dashboard
        </Link>

        <Link
          href="/groups"
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          Groups
        </Link>
      </div>
    </nav>
  );
}