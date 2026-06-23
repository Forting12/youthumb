import "../styles/index.css";
import { Fragment } from "react";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <DefaultSeo
        title="HunterCTR AI — Competitor-Driven YouTube Optimizer"
        description="Reverse-engineer a competitor video and rebuild the winning hook with your own footage: titles, descriptions, tags, hashtags and thumbnail concepts for treasure & mystery content."
        canonical="https://your-website-url.com"
        openGraph={{
          url: "https://your-website-url.com",
          title: "HunterCTR AI",
          description:
            "Competitor reverse-engineering + creator adaptation engine for long-form treasure, mystery and discovery videos.",
          site_name: "HunterCTR AI",
        }}
      />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
