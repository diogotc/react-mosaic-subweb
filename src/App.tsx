import React, {
  useMemo,
  useRef,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import {
  ActionButton,
  Button,
  MenuMultiSelect,
  type SelectOption,
} from "sbwb-ds";
import type { MosaicNode } from "react-mosaic-component";
import { MosaicContainer } from "./components/mosaic-container";
import { useMosaicLayout } from "./components/mosaic-container/hooks/useMosaicLayout";
import { ComponentA } from "./components/ComponentA";
import { ComponentB } from "./components/ComponentB";
import { ComponentC } from "./components/ComponentC";

const ALL_WIDGETS: { label: string; value: number }[] = [
  {
    label: "Component A",
    value: 1,
  },
  {
    label: "Component B",
    value: 2,
  },
  {
    label: "Component C",
    value: 3,
  },
];

const INITIAL_LAYOUT: MosaicNode<number> = {
  direction: "row",
  first: 1,
  second: {
    direction: "column",
    first: 2,
    second: 3,
    splitPercentage: 40,
  },
  splitPercentage: 60,
} as const;

// Utility to prune the layout tree to only include selected widget IDs
function pruneLayout(
  layout: MosaicNode<number> | null,
  validIds: Set<number>
): MosaicNode<number> | null {
  if (!layout) return null;
  if (typeof layout === "number") {
    return validIds.has(layout as number) ? layout : null;
  }
  // layout is a parent node
  const first = pruneLayout(layout.first, validIds);
  const second = pruneLayout(layout.second, validIds);
  if (first && second) {
    return { ...layout, first, second };
  }
  return first || second;
}

export const App = () => {
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const [selectedWidgets, setSelectedWidgets] =
    useState<SelectOption[]>(ALL_WIDGETS);
  const { layout, setLayout, addWidget, removeWidget } =
    useMosaicLayout<number>(INITIAL_LAYOUT);

  useEffect(() => {
    const validIds = new Set(selectedWidgets.map((w) => w.value as number));
    setLayout((prev) =>
      selectedWidgets.length === 0 ? null : pruneLayout(prev, validIds)
    );
  }, [selectedWidgets, setLayout]);

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const widgets: Record<number, ReactNode> = useMemo(
    () => ({
      1: <ComponentA />,
      2: <ComponentB />,
      3: <ComponentC />,
    }),
    []
  );

  const activeWidgets = useMemo(
    () =>
      selectedWidgets.map((widget) => ({
        id: widget.value as number,
        title: widget.label as string,
        content: widgets[widget.value as number],
      })),
    [selectedWidgets, widgets]
  );

  const handleLayoutChange = (newLayout: MosaicNode<number> | null) => {
    setLayout(newLayout);
    console.log("Layout changed:", newLayout);
  };

  const handleWidgetClose = (widgetId: number) => {
    console.log(`Widget ${widgetId} closed`);
    removeWidget(widgetId);
    setSelectedWidgets((prev) => prev.filter((w) => w.value !== widgetId));
  };

  const handleSelectWidget = (widget: SelectOption) => {
    const isSelected = selectedWidgets.some((w) => w.value === widget.value);
    let newSelected: SelectOption[];
    if (isSelected) {
      removeWidget(widget.value as number);
      newSelected = selectedWidgets.filter((w) => w.value !== widget.value);
    } else {
      addWidget(widget.value as number);
      newSelected = [...selectedWidgets, widget];
    }
    // Prune layout to only include selected widgets
    const validIds = new Set(newSelected.map((w) => w.value as number));
    if (newSelected.length === 0) {
      setLayout(null);
    } else {
      setLayout((prev) => pruneLayout(prev, validIds));
    }
    setSelectedWidgets(newSelected);
  };

  const handleResetLayout = () => {
    setSelectedWidgets(ALL_WIDGETS);
    setLayout(INITIAL_LAYOUT as MosaicNode<number>);
  };

  return (
    <div className="h-[calc(100vh-180px)] bg-gray-100">
      <div className="h-full p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mosaico</h1>
            <p className="text-gray-600">
              Arraste as janelas para organizá-las
            </p>
          </div>
          <div ref={selectContainerRef} className="flex gap-4">
            <Button iconName="UndoAnt" size="Small" onClick={handleResetLayout}>
              Restaurar
            </Button>
            <ActionButton
              iconName="SettingsFill0Ant"
              onClick={() => setIsPopoverActive((prev) => !prev)}
            />
            {isPopoverActive && (
              <MenuMultiSelect
                selectContainerRef={
                  selectContainerRef as React.MutableRefObject<HTMLDivElement>
                }
                setExpanded={() => setIsPopoverActive(false)}
                size="Medium"
                inputValue=""
                value={selectedWidgets}
                selectOption={handleSelectWidget}
                optionsSelect={ALL_WIDGETS}
              />
            )}
          </div>
        </div>

        <div className="h-full border border-gray-300 rounded-lg overflow-hidden">
          <MosaicContainer
            widgets={activeWidgets}
            value={layout}
            onChange={handleLayoutChange}
            onWidgetClose={handleWidgetClose}
            zeroStateView={null}
            defaultBackgroundColor="#ffffff"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};
