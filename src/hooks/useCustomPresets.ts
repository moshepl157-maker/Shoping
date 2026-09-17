"use client";

import { useSyncExternalStore } from "react";
import * as customPresetsStore from "@/lib/customPresetsStore";

export function useCustomPresets() {
  const presets = useSyncExternalStore(
    customPresetsStore.subscribe,
    customPresetsStore.getSnapshot,
    customPresetsStore.getServerSnapshot
  );

  return { presets, addCustomPreset: customPresetsStore.addCustomPreset };
}
