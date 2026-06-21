import ContentPage from "../components/layout/ContentPage";

export default function Privacy() {
  return (
    <ContentPage
      title="Privacy Policy"
      description="How YouThumb handles your data."
      path="/privacy"
    >
      <p>
        We don&apos;t require an account and we don&apos;t store your downloads.
        Links you paste are processed only to fetch the requested media and are
        not logged or shared.
      </p>
      <p>
        We use basic, privacy-friendly analytics to count page views. No
        personal data is sold. If you have questions, contact us at{" "}
        <a className="text-blue-600 underline" href="mailto:ayoubigli95@gmail.com">
          ayoubigli95@gmail.com
        </a>
        .
      </p>
    </ContentPage>
  );
}
