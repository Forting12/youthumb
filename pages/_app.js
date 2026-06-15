import "../styles/index.css";
import { Fragment } from "react";
import { DefaultSeo } from "next-seo";
import Layout from "../components/Layout";

const SITE_URL = "https://relicquest.example.com";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <DefaultSeo
        titleTemplate="%s · RelicQuest"
        defaultTitle="RelicQuest — Treasure Hunting, Metal Detecting & Coin ID"
        description="Identify coins from a photo, browse field guides and detector reviews, and trade tips in the treasure hunting community."
        canonical={SITE_URL}
        openGraph={{
          type: "website",
          url: SITE_URL,
          title: "RelicQuest — Treasure Hunting, Metal Detecting & Coin ID",
          description:
            "Identify coins from a photo, browse field guides and detector reviews, and trade tips in the treasure hunting community.",
          site_name: "RelicQuest",
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
