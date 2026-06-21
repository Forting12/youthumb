import Layout from "./Layout";
import Seo from "../seo/Seo";

// Simple prose wrapper for legal/static pages.
export default function ContentPage({ title, description, path, children }) {
  return (
    <Layout>
      <Seo title={title} description={description} path={path} />
      <article className="container-tight py-12">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
          {children}
        </div>
      </article>
    </Layout>
  );
}
