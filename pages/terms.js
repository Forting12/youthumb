import ContentPage from "../components/layout/ContentPage";

export default function Terms() {
  return (
    <ContentPage
      title="Terms of Use"
      description="The terms for using YouThumb."
      path="/terms"
    >
      <p>
        This tool is provided &quot;as is&quot; for personal use. You are
        responsible for what you download. Only download content you own or have
        permission to use.
      </p>
      <p>
        We are not affiliated with Instagram, Meta, or YouTube. By using this
        site you agree to respect copyright and each platform&apos;s terms of
        service.
      </p>
    </ContentPage>
  );
}
