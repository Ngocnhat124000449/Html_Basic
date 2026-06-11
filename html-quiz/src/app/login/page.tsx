"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Email hoặc mật khẩu không đúng");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="animate-rise mx-auto mt-14 max-w-sm">
      <div className="mb-8 text-center">
        <span className="inline-block rounded-2xl bg-flame-500 px-3 py-1.5 font-mono text-xl font-bold text-white shadow-lg shadow-flame-500/30">
          &lt;/&gt;
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Chào mừng trở lại</h1>
        <p className="mt-1.5 text-sm text-ink/60">
          Mỗi ngày vài thẻ HTML — nhớ lâu nhờ ôn tập ngắt quãng
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink/70">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ban@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-ink/10 bg-paper px-3.5 py-2.5 transition-colors focus:border-flame-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink/70">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-ink/10 bg-paper px-3.5 py-2.5 transition-colors focus:border-flame-400 focus:outline-none"
              required
            />
          </div>
          {error && (
            <p className="animate-shake rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-flame-500 py-3 font-semibold text-white shadow-sm transition-all hover:bg-flame-600 hover:shadow-md disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>

      <p className="mt-5 text-center text-sm text-ink/60">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="font-semibold text-flame-600 hover:underline">
          Đăng ký miễn phí
        </Link>
      </p>
    </div>
  );
}
