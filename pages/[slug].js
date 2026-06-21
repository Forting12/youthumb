import ToolPage from "../components/tool/ToolPage";
import InstagramDownloader from "../components/tool/InstagramDownloader";
import { SEO_PAGES, SEO_SLUGS } from "../lib/seoPages";
import { COMMON_FAQS } from "../lib/faqs";

const TOOL_CONFIG = {
  reel: {
    kind: "instagram-reel",
    placeholder: "https://www.instagram.com/reel/XXXXXXX/",
    helper: "Paste a Reel link like https://www.instagram.com/reel/XXXXXXX/",
  },
  photo: {
    kind: "instagram-photo",
    placeholder: "https://www.instagram.com/p/XXXXXXX/",
    helper: "Paste a post link like https://www.instagram.com/p/XXXXXXX/",
  },
  carousel: {
    kind: "instagram-carousel",
    placeholder: "https://www.instagram.com/p/XXXXXXX/",
    helper: "Paste a post link like https://www.instagram.com/p/XXXXXXX/",
  },
};

export default function SeoLanding({ slug, page }) {
  const tool = TOOL_CONFIG[page.tool];
  const path = `/${slug}`;

  return (
    <ToolPage
      title={page.title}
      description={page.description}
      path={path}
      currentHref={path}
      heading={page.heading}
      subheading={page.subheading}
      faqs={COMMON_FAQS}
      body={<p>{page.intro}</p>}
    >
      <InstagramDownloader
        kind={tool.kind}
        placeholder={tool.placeholder}
        helper={tool.helper}
      />
    </ToolPage>
  );
}

export function getStaticPaths() {
  return {
    paths: SEO_SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const page = SEO_PAGES[params.slug];
  if (!page) return { notFound: true };
  return { props: { slug: params.slug, page } };
}
