"use client";

import { useEffect, useRef } from "react";

/**
 * Invisible client component that calls a server action once on mount.
 * Drop into any Server Component page to auto-clear notifications.
 */
export default function MarkAsReadEffect({
  action,
}: {
  action: () => Promise<void>;
}) {
  const called = useRef(false);

  useEffect(() => {
    if (!called.current) {
      called.current = true;
      action();
    }
  }, [action]);

  return null;
}
