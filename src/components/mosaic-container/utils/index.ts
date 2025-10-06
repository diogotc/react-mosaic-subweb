import type { MosaicNode } from "react-mosaic-component";

type WidgetID = number;
type MosaicLayout = MosaicNode<WidgetID>;

export const addWidgetToLayout = (
  layout: MosaicLayout | null,
  widgetId: WidgetID
): MosaicLayout => {
  if (!layout) return widgetId;

  return {
    direction: "row",
    first: layout,
    second: widgetId,
    splitPercentage: 70, // Default split when adding new widget
  };
};

export const removeWidgetFromLayout = (
  layout: MosaicLayout | null,
  widgetId: WidgetID
): MosaicLayout | null => {
  if (!layout) return null;
  if (layout === widgetId) return null;

  if (typeof layout === "object") {
    const first = removeWidgetFromLayout(layout.first, widgetId);
    const second = removeWidgetFromLayout(layout.second, widgetId);

    if (!first) return second;
    if (!second) return first;

    return {
      ...layout,
      first,
      second,
    };
  }

  return layout;
};

export const getVisibleWidgetsFromLayout = (
  layout: MosaicLayout | null
): WidgetID[] => {
  if (!layout) return [];
  if (typeof layout === "number") return [layout];

  return [
    ...getVisibleWidgetsFromLayout(layout.first),
    ...getVisibleWidgetsFromLayout(layout.second),
  ];
};
