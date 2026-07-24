import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          SplitMate
        </h1>

        <div className="flex gap-4">

          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="text-center">

          <h1 className="text-6xl font-extrabold leading-tight">

            Split Expenses

            <span className="text-blue-500">
              {" "}Without Stress
            </span>

          </h1>

          <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto">

            SplitMate helps friends, roommates and travel groups
            track shared expenses, calculate balances and settle
            payments effortlessly.

          </p>

          <div className="flex justify-center gap-6 mt-12">

            <Link
              href="/register"
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-lg transition"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 font-semibold text-lg transition"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why SplitMate?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

            <div className="text-5xl mb-5">
              👥
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Create Groups
            </h3>

            <p className="text-slate-400">
              Organize trips, outings, roommates or events into
              dedicated expense groups.
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

            <div className="text-5xl mb-5">
              💸
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Track Expenses
            </h3>

            <p className="text-slate-400">
              Add shared expenses and instantly calculate who owes
              whom.
            </p>

          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

            <div className="text-5xl mb-5">
              ⚖️
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Settle Easily
            </h3>

            <p className="text-slate-400">
              Keep everyone's balances clear and avoid awkward money
              conversations.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800 py-8">

        <p className="text-center text-slate-500">

          Built with ❤️ using Next.js, MongoDB & Tailwind CSS

        </p>

      </footer>

    </main>
  );
}