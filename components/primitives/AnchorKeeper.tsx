"use client";

import { useEffect } from "react";

// Keeps a link to a section landing on that section.
//
// Live figures arrive a moment after the page does and can make the content
// above a section taller, which pushes the section the reader asked for out
// of place. For the first five seconds after a page opens with "#anchor" in
// its address, this re-aligns the anchor whenever the page changes height.
// It stops the moment the reader scrolls, taps or presses a key, so it never
// fights them. With no anchor in the address it does nothing.
export function AnchorKeeper() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!id || typeof ResizeObserver === "undefined") return;

    let done = false;
    const align = () => {
      if (done) return;
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    };
    const observer = new ResizeObserver(align);
    const stop = () => {
      if (done) return;
      done = true;
      observer.disconnect();
      window.clearTimeout(timer);
      for (const name of events) window.removeEventListener(name, stop);
    };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    for (const name of events)
      window.addEventListener(name, stop, { passive: true });
    const timer = window.setTimeout(stop, 5000);
    observer.observe(document.body);
    return stop;
  }, []);
  return null;
}
