import ContentPage from "../components/layout/ContentPage";

export default function Contact() {
  return (
    <ContentPage
      title="Contact"
      description="Get in touch with YouThumb."
      path="/contact"
    >
      <p>
        Questions or takedown requests? Email{" "}
        <a className="text-blue-600 underline" href="mailto:ayoubigli95@gmail.com">
          ayoubigli95@gmail.com
        </a>
        .
      </p>
      <p>We respond to valid copyright and removal requests promptly.</p>
    </ContentPage>
  );
}
