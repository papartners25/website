export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="surface rounded-xl px-4 py-6 text-sm text-slate-300 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} PA Partners. All rights reserved.</p>
          <p>
            Value‑add real estate and applied AI solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}


