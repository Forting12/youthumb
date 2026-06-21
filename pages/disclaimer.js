import ContentPage from "../components/layout/ContentPage";

export default function Disclaimer() {
  return (
    <ContentPage
      title="Disclaimer"
      description="YouThumb is not affiliated with Instagram, Meta, or YouTube."
      path="/disclaimer"
    >
      <p>
        We are not affiliated with, endorsed by, or sponsored by Instagram,
        Meta, or YouTube. All trademarks belong to their owners.
      </p>
      <p>
        Use this tool to download content you have the right to download. Please
        respect copyright and each platform&apos;s terms.
      </p>
    </ContentPage>
  );
}
