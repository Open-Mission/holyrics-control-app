import { HolyricsConnectionIndicator } from "@/components/HolyricsConnectionIndicator";

const DESKTOP_REFRESH_INTERVAL_MS = 30_000;

export function HolyricsConnectionCard() {
  return <HolyricsConnectionIndicator refreshIntervalMs={DESKTOP_REFRESH_INTERVAL_MS} variant="card" />;
}
