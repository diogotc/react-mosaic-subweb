import { useEffect, useState } from "react";
import type { MosaicNode } from "react-mosaic-component";

// Helper to check if a widgetId exists in the layout tree
function containsWidget<T extends string | number>(
  node: MosaicNode<T> | null,
  widgetId: T
): boolean {
  if (!node) return false;
  if (typeof node === "string" || typeof node === "number") {
    return node === widgetId;
  }
  // node is a MosaicParent
  return (
    containsWidget(node.first, widgetId) ||
    containsWidget(node.second, widgetId)
  );
}

export function useMosaicLayout<T extends string | number>(
  initialLayout: MosaicNode<T>
) {
  const [layout, setLayout] = useState<MosaicNode<T> | null>(initialLayout);

  useEffect(() => {
    setLayout(initialLayout);
  }, [initialLayout]);

  const addWidget = (widgetId: T) => {
    setLayout((current) => {
      if (!current) return widgetId;
      if (containsWidget(current, widgetId)) return current; // Prevent duplicates
      return {
        direction: "row",
        first: current,
        second: widgetId,
        splitPercentage: 70,
      };
    });
  };

  const removeWidget = (widgetId: T) => {
    setLayout((current) => {
      if (!current) return null;
      if (current === widgetId) return null;

      if (typeof current === "object") {
        const first = current.first === widgetId ? null : current.first;
        const second = current.second === widgetId ? null : current.second;

        if (!first) return second as MosaicNode<T>;
        if (!second) return first as MosaicNode<T>;

        return {
          ...current,
          first,
          second,
        };
      }
      return current;
    });
  };

  return { layout, setLayout, addWidget, removeWidget };
}
