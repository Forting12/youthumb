import ToolPage from "../components/tool/ToolPage";
import InstagramDownloader from "../components/tool/InstagramDownloader";
import { COMMON_FAQS } from "../lib/faqs";

const PATH = "/instagram-carousel-downloader";

export default function InstagramCarouselDownloader() {
  return (
    <ToolPage
      title="Instagram Carousel Downloader"
      description="Download every photo and video from an Instagram carousel post in one go."
      path={PATH}
      currentHref={PATH}
      heading="Instagram Carousel Downloader"
      subheading="Download every photo and video from a carousel post in one go."
      faqs={COMMON_FAQS}
      body={
        <p>
          Carousels can hold up to 20 items. Paste the post link and we&apos;ll
          list each photo and video so you can download them individually.
        </p>
      }
    >
      <InstagramDownloader
        kind="instagram-carousel"
        placeholder="https://www.instagram.com/p/XXXXXXX/"
        helper="Paste a multi-image post link like https://www.instagram.com/p/XXXXXXX/"
      />
    </ToolPage>
  );
}
