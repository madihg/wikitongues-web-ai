import { site } from "@/content/config";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-container px-5 py-24 text-center sm:px-6">
      <p className="overline mb-3">404</p>
      <h1 className="text-3xl font-semibold md:text-4xl">
        This page does not exist
      </h1>
      <p className="mx-auto mt-4 max-w-measure text-muted">
        The page you are looking for could not be found.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 py-3 font-semibold text-accent-on hover:bg-accent-hover"
      >
        Back to {site.name}
      </a>
    </div>
  );
}
