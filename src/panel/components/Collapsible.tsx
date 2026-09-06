import React, { forwardRef, useCallback, useRef, useMemo } from "react";

export const Collapsible = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { collapsed: boolean }
>(function Collapsible({ collapsed, ...props }, forwardedRef) {
  const ref = useRef<HTMLDivElement>(null);

  const handleRef = useCallback(
    (e: HTMLDivElement | null) => {
      ref.current = e;

      if (typeof forwardedRef === "function") {
        return forwardedRef(e);
      }

      if (forwardedRef) {
        forwardedRef.current = e;
      }
    },
    [ref],
  );

  const maxHeight = useMemo(() => {
    if (ref.current && !collapsed) {
      return ref.current.scrollHeight;
    }

    return 0;
  }, [collapsed]);

  return (
    <div
      {...props}
      aria-expanded={!collapsed}
      ref={handleRef}
      style={{ ...props.style, maxHeight, overflow: "hidden" }}
    />
  );
});
