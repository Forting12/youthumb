import "../styles/index.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "../lib/constants";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${SITE_NAME}`}
        defaultTitle={SITE_NAME}
        description={SITE_DESCRIPTION}
        canonical={SITE_URL}
        openGraph={{
          type: "website",
          url: SITE_URL,
          site_name: SITE_NAME,
          description: SITE_DESCRIPTION,
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
