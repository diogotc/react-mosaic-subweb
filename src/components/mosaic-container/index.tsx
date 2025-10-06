import { useCallback, useEffect, useMemo, useState, ReactNode } from "react";
import {
  Mosaic,
  MosaicWindow,
  MosaicBranch,
  MosaicNode,
} from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "./mosaic-container.css";
import { Close } from "sbwb-icons";
import { Toolbar } from "./toolbar";

export interface MosaicLayout<T = number> {
  direction: "row" | "column";
  first: T | MosaicLayout<T>;
  second: T | MosaicLayout<T>;
  splitPercentage?: number;
}

export interface WidgetConfig {
  id: number;
  title: string;
  content: ReactNode;
  closable?: boolean;
  customToolbar?: ReactNode;
  onClose?: () => void;
}

export interface MosaicContainerProps<T extends number = number> {
  // Layout configuration
  value: MosaicNode<T> | null;
  onChange: (layout: MosaicNode<T> | null) => void;

  // Widget configuration
  widgets: Record<T, WidgetConfig> | WidgetConfig[];

  // Customization options
  zeroStateView: JSX.Element | null;

  // Widget creation
  createNewWidgetId?: () => T;

  // Global callbacks
  onWidgetClose?: (widgetId: number) => void;
  onWidgetCreate?: (widgetId: T) => void;

  // Styling
  defaultBackgroundColor?: string;
}

export function MosaicContainer<T extends number = number>({
  value,
  onChange,
  widgets,
  zeroStateView,
  onWidgetClose,
}: MosaicContainerProps<T>) {
  const [, updateState] = useState(0);
  const triggerRerender = useCallback(() => updateState((n) => n + 1), []);

  useEffect(() => {
    triggerRerender();
  }, []);

  const widgetMap = useMemo(() => {
    if (Array.isArray(widgets)) {
      return widgets.reduce((acc, widget) => {
        acc[widget.id as T] = widget;
        return acc;
      }, {} as Record<T, WidgetConfig>);
    }
    return widgets;
  }, [widgets]);

  const renderTile = useCallback(
    (id: T, path: MosaicBranch[]) => {
      const widget = widgetMap[id];

      const onClose = () => {
        if (onWidgetClose) {
          onWidgetClose(id as number);
        }
      };

      if (!widget) {
        return (
          <MosaicWindow<T> path={path} title={`Unknown Widget: ${id}`}>
            <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
              <h3 className="font-semibold mb-2">Widget Not Found</h3>
              <p>
                Widget with ID "{id}" was not found in the widgets
                configuration.
              </p>
            </div>
          </MosaicWindow>
        );
      }

      return (
        <MosaicWindow<T>
          path={path}
          title={widget.title}
          renderToolbar={() => (
            <div style={{ width: "100%" }}>
              <Toolbar id={widget.id} title={widget.title} onClose={onClose} />
            </div>
          )}
        >
          <div
            style={{
              width: "100%",
              height: "calc(100% - 10px)",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            {widget.content}
          </div>
        </MosaicWindow>
      );
    },
    [widgetMap]
  );

  const defaultZeroState = (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="flex flex-col gap-1 items-center justify-center">
        <Close className="w-10 h-10 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No widgets to display
        </h3>
        <p className="text-gray-500 text-sm">
          Add some widgets to your layout to get started
        </p>
      </div>
    </div>
  );

  return (
    <div className={`h-full w-full`}>
      <Mosaic<T>
        renderTile={renderTile}
        value={value}
        onChange={onChange}
        zeroStateView={zeroStateView || defaultZeroState}
        blueprintNamespace="bp4"
      />
    </div>
  );
}
