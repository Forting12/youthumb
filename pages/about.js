import ContentPage from "../components/layout/ContentPage";

export default function About() {
  return (
    <ContentPage
      title="About"
      description="About YouThumb."
      path="/about"
    >
      <p>
        YouThumb is a free, no-login set of tools for saving public media from
        Instagram and YouTube. Built for speed and simplicity.
      </p>
    </ContentPage>
  );
}
