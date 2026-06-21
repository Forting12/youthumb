import Link from "next/link";
import { SITE_NAME, TOOLS } from "../../lib/constants";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container-wide flex items-center justify-between py-4">
        <Link href="/">
          <a className="text-lg font-bold text-gray-900">{SITE_NAME}</a>
        </Link>
        <nav className="hidden gap-5 text-sm text-gray-600 sm:flex">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href}>
              <a className="hover:text-gray-900">{t.title.replace(" Downloader", "")}</a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
