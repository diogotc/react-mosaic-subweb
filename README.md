# react-mosaic

A powerful, flexible mosaic layout component built on react-mosaic-component that allows users to create customizable dashboard layouts with draggable, resizable widgets.

## Overview

The `react-mosaic-component` provides a complete solution for creating dynamic dashboard layouts where users can:

- Drag and drop widgets to rearrange their workspace
- Resize panels with intuitive split handles
- Show/hide widgets through a context menu
- Maintain their layout preferences

## Installation

### Prerequisites

Ensure you have the required dependencies:

```bash
npm install react-mosaic-component
```

### Component Structure

Copy these files to your project:

- `components/mosaic-container` (e subdiretórios)

## How to use this template

This repository is ready to use with `react-mosaic-component` and provides an example dashboard with customizable widgets. Follow the steps below to run and adapt it to your project:

### 1. Install dependencies

```bash
npm install
```

### 2. Run the project locally

```bash
npm run dev
```
The project will be available at `http://localhost:5173`.

### 3. Widget structure

Widgets are defined in `src/components/ComponentA.tsx`, `ComponentB.tsx`, and `ComponentC.tsx`. You can create new components and add them to the `ALL_WIDGETS` array in `App.tsx`.

### 4. Initial layout

The initial dashboard layout is defined by the `INITIAL_LAYOUT` constant in `App.tsx`. You can customize the initial arrangement of widgets by editing this structure.

### 5. Adding/removing widgets

Users can add or remove widgets using the selection menu (gear icon) at the top of the screen. The layout will adjust automatically.

### 6. Resetting the layout

Click the "Restore" button to return to the default layout.

### 7. Customization

- To customize the appearance, edit the CSS files in `components/mosaic-container/mosaic-container.css`.
- To change the widget toolbar, edit `components/mosaic-container/toolbar`.
- For layout logic, use the `useMosaicLayout` hook.

### 8. Example usage of MosaicContainer

See in `App.tsx` how `MosaicContainer` is used:

```tsx
<MosaicContainer
  widgets={activeWidgets}
  value={layout}
  onChange={handleLayoutChange}
  onWidgetClose={handleWidgetClose}
  zeroStateView={null}
  defaultBackgroundColor="#ffffff"
/>
```

Check the code for more examples and customization possibilities.

---

This template serves as a starting point for building dynamic and responsive dashboards using React and react-mosaic-component.

