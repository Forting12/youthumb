import Link from "next/link";
import { SITE_NAME, TOOLS, LEGAL_LINKS } from "../../lib/constants";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container-wide grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-bold text-gray-900">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-gray-500">
            Free tools to save public media from Instagram and YouTube.
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-900">Tools</p>
          <ul className="space-y-1 text-sm text-gray-600">
            {TOOLS.map((t) => (
              <li key={t.href}>
                <Link href={t.href}>
                  <a className="hover:text-gray-900">{t.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-900">Legal</p>
          <ul className="space-y-1 text-sm text-gray-600">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <a className="hover:text-gray-900">{l.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-wide border-t border-gray-100 py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} {SITE_NAME}. Not affiliated with Instagram,
        Meta, or YouTube.
      </div>
    </footer>
  );
}
