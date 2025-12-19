import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <div className="space-y-6 text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Rooxy AI
        </h1>
        <p className="text-slate-400 text-xl">
          The world's most advanced AI sales platform. Experience the future of sales.
        </p>

        <div className="pt-8">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
          >
            Launch Demo <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-slate-600 text-sm">
        Clone created for Demo Purposes
      </div>
    </div>
  );
}
