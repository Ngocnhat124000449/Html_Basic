import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "HTML Quiz",
  description: "Học thẻ HTML qua trắc nghiệm và gõ code",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-3xl items-center gap-4 p-4">
            <Link href="/" className="font-bold text-blue-700">
              HTML Quiz
            </Link>
            {session && (
              <>
                <Link href="/tags" className="text-sm hover:underline">
                  Thẻ
                </Link>
                <Link href="/study" className="text-sm hover:underline">
                  Học
                </Link>
                <span className="ml-auto text-sm text-slate-500">{session.user?.name}</span>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/login" });
                  }}
                >
                  <button className="text-sm text-red-600 hover:underline">Đăng xuất</button>
                </form>
              </>
            )}
          </nav>
        </header>
        <main className="mx-auto max-w-3xl p-4">{children}</main>
      </body>
    </html>
  );
}
