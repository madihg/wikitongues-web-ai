"use client";

import { useEffect, useState } from "react";
import { statsApi } from "@/content/config";
import type { PublicStats } from "@/content/types";

// Shared, deduplicated fetch of the public stats endpoint. Several components
// on the Research page read the same numbers; a module-level cache + in-flight
// promise means they all resolve from a SINGLE network request, and the values
// refresh whenever the page is loaded (the endpoint itself is cached ~5 min).

let cache: PublicStats | null = null;
let inFlight: Promise<PublicStats> | null = null;

function load(): Promise<PublicStats> {
  if (cache) return Promise.resolve(cache);
  if (inFlight) return inFlight;
  inFlight = fetch(statsApi.url, {
    headers: { Accept: "application/json" },
    // aggregate public data; no cookies ever sent cross-origin
    credentials: "omit",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`stats request failed (${res.status})`);
      return res.json() as Promise<PublicStats>;
    })
    .then((data) => {
      cache = data;
      inFlight = null;
      return data;
    })
    .catch((err) => {
      inFlight = null;
      throw err;
    });
  return inFlight;
}

export type StatsState =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: PublicStats; error: null }
  | { status: "error"; data: null; error: string };

export function useStats(): StatsState {
  const [state, setState] = useState<StatsState>(
    cache
      ? { status: "ready", data: cache, error: null }
      : { status: "loading", data: null, error: null },
  );

  useEffect(() => {
    let active = true;
    if (cache) {
      setState({ status: "ready", data: cache, error: null });
      return;
    }
    load()
      .then((data) => {
        if (active) setState({ status: "ready", data, error: null });
      })
      .catch((err: unknown) => {
        if (active)
          setState({
            status: "error",
            data: null,
            error: err instanceof Error ? err.message : String(err),
          });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
