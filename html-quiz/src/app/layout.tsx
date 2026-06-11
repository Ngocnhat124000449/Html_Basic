import type { Metadata } from "next";
import Link from "next/link";
import { Be_Vietnam_Pro, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { auth, signOut } from "@/lib/auth";
import NavLinks from "@/components/nav-links";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["vietnamese", "latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HTML Quiz — Học thẻ HTML mỗi ngày",
  description: "Học thẻ HTML qua trắc nghiệm và gõ code, ôn tập ngắt quãng (SRS)",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    // suppressHydrationWarning: extension trình duyệt (vd. Immersive Translate) chèn
    // attribute vào <html> trước khi React hydrate, gây cảnh báo mismatch giả
    <html
      lang="vi"
      className={`${beVietnam.variable} ${bricolage.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur">
          <nav className="mx-auto flex max-w-3xl items-center gap-1.5 px-3 py-3 sm:gap-4 sm:px-4">
            <Link href="/" className="group flex shrink-0 items-center gap-2">
              <span className="rounded-lg bg-flame-500 px-1.5 py-0.5 font-mono text-sm font-bold text-white transition-transform group-hover:-rotate-3">
                &lt;/&gt;
              </span>
              <span className="hidden whitespace-nowrap font-display text-lg font-bold tracking-tight min-[420px]:inline">
                HTML Quiz
              </span>
            </Link>
            {session && (
              <>
                <NavLinks />
                <div className="ml-auto flex items-center gap-3">
                  <span className="hidden whitespace-nowrap text-sm font-medium text-ink/60 md:inline">
                    {session.user?.name}
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/login" });
                    }}
                  >
                    <button
                      title="Đăng xuất"
                      className="whitespace-nowrap rounded-full border border-ink/15 px-2.5 py-1.5 text-sm text-ink/70 transition-colors hover:border-flame-300 hover:bg-flame-50 hover:text-flame-700 sm:px-3"
                    >
                      <span className="sm:hidden">⏻</span>
                      <span className="hidden sm:inline">Đăng xuất</span>
                    </button>
                  </form>
                </div>
              </>
            )}
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-4 pb-16">{children}</main>
      </body>
    </html>
  );
}
