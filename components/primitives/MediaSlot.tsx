interface MediaSlotProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}

// Responsive media slot with a graceful fallback. When no `src` exists (the
// common case before launch assets are ready), it renders a quiet placeholder
// instead of leaving a hole - the layout never depends on the image.
export function MediaSlot({
  src,
  alt = "",
  width,
  height,
  caption,
}: MediaSlotProps) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface-sunken"
      >
        <span className="overline">Media coming soon</span>
      </div>
    );
  }
  return (
    <figure className="m-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
