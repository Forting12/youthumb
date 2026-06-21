import ToolPage from "../components/tool/ToolPage";
import InstagramDownloader from "../components/tool/InstagramDownloader";
import { COMMON_FAQS } from "../lib/faqs";

const PATH = "/instagram-photo-downloader";

export default function InstagramPhotoDownloader() {
  return (
    <ToolPage
      title="Instagram Photo Downloader"
      description="Save Instagram photos in their original full resolution. Free, no login."
      path={PATH}
      currentHref={PATH}
      heading="Instagram Photo Downloader"
      subheading="Save Instagram photos in their original full resolution."
      faqs={COMMON_FAQS}
      body={
        <p>
          Screenshots lose quality. Paste a public photo post link and download
          the original image file at full size.
        </p>
      }
    >
      <InstagramDownloader
        kind="instagram-photo"
        placeholder="https://www.instagram.com/p/XXXXXXX/"
        helper="Paste a post link like https://www.instagram.com/p/XXXXXXX/"
      />
    </ToolPage>
  );
}
