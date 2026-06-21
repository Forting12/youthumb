import ToolPage from "../components/tool/ToolPage";
import InstagramDownloader from "../components/tool/InstagramDownloader";
import { COMMON_FAQS } from "../lib/faqs";

const PATH = "/instagram-reel-downloader";

export default function InstagramReelDownloader() {
  return (
    <ToolPage
      title="Instagram Reel Downloader"
      description="Download Instagram Reels as high-quality MP4 — fast, free, no watermark."
      path={PATH}
      currentHref={PATH}
      heading="Instagram Reel Downloader"
      subheading="Download Instagram Reels as high-quality MP4 — fast, free, no watermark."
      faqs={COMMON_FAQS}
      body={
        <p>
          Instagram doesn&apos;t offer a built-in download button for Reels.
          Paste the share link above and we&apos;ll fetch the original MP4 so you
          can save it to your device. Works for public Reels.
        </p>
      }
    >
      <InstagramDownloader
        kind="instagram-reel"
        placeholder="https://www.instagram.com/reel/XXXXXXX/"
        helper="Paste a Reel link like https://www.instagram.com/reel/XXXXXXX/"
      />
    </ToolPage>
  );
}
