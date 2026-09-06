import React, {
  PropsWithChildren,
  useCallback,
  useState,
  useMemo,
  MouseEventHandler,
  useRef,
  FC,
} from "react";
import { useOrientationWatcher } from "../hooks";
import {
  container,
  draggingEdge,
  body,
  header,
  item,
  itemTitle,
} from "./Pane.css";

interface OverrideProps {
  forcedOrientation?: { isPortrait: boolean };
  initSize?: { x: number; y: number };
  "data-snapshot"?: boolean;
  style?: React.CSSProperties;
}

const PaneRoot: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & OverrideProps>> = ({
  children,
  forcedOrientation,
  initSize,
  ...props
}) => {
  const [grabbed, setGrabbed] = useState(false);
  const [size, setSize] = useState(initSize ? initSize : { x: 400, y: 400 });
  const dynamicOrientation = useOrientationWatcher();
  const paneRef = useRef(null);

  const { isPortrait } = forcedOrientation
    ? forcedOrientation
    : dynamicOrientation;

  type position = { x: number; y: number };
  const handleClick = useCallback<MouseEventHandler>(
    (ce) => {
      if (ce.button !== 0) {
        return;
      }

      ce.preventDefault();
      document.body.style.cursor = isPortrait ? "ns-resize" : "ew-resize";
      setGrabbed(true);
      let latestPosition: position = { x: ce.clientX, y: ce.clientY };
      let moving = true;

      const renderFrame = () => {
        window.requestAnimationFrame(() => {
          setSize((s) =>
            isPortrait
              ? {
                  ...s,
                  y: window.innerHeight - latestPosition.y,
                }
              : { ...s, x: window.innerWidth - latestPosition.x }
          );
          moving && renderFrame();
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        latestPosition = { x: e.clientX, y: e.clientY };
      };

      const handleMouseUp = () => {
        moving = false;
        document.body.style.cursor = "";
        setGrabbed(false);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
      };

      renderFrame();
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
    },
    [size, isPortrait]
  );

  const dynamicStyle = useMemo(
    () =>
      isPortrait
        ? { minHeight: size.y, height: size.y, width: "auto" }
        : { minWidth: size.x, width: size.x, height: "auto" },
    [size, isPortrait]
  );

  return (
    <div
      {...props}
      className={`${container} ${props.className || ""}`}
      style={{ ...props.style, ...dynamicStyle }}
      data-portrait={`${isPortrait}`}
      ref={paneRef}
    >
      {children}
      <div
        role="seperator"
        aria-orientation={isPortrait ? "horizontal" : "vertical"}
        aria-grabbed={grabbed}
        onMouseDown={handleClick}
        data-portrait={`${isPortrait}`}
        className={draggingEdge}
      />
    </div>
  );
};

type Pane = typeof PaneRoot & {
  Body: FC<React.HTMLAttributes<HTMLDivElement>>;
  Header: FC<React.HTMLAttributes<HTMLHeadingElement>>;
  Item: FC<React.HTMLAttributes<HTMLDivElement>>;
  ItemTitle: FC<React.HTMLAttributes<HTMLHeadingElement>>;
};

const Body: FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div {...props} className={`${body} ${className || ""}`} />
);

const Header: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 {...props} className={`${header} ${className || ""}`} />
);

const Item: FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div {...props} className={`${item} ${className || ""}`} />
);

const ItemTitle: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 {...props} className={`${itemTitle} ${className || ""}`} />
);

(PaneRoot as Pane).Body = Body;
(PaneRoot as Pane).Header = Header;
(PaneRoot as Pane).Item = Item;
(PaneRoot as Pane).ItemTitle = ItemTitle;

export const Pane = PaneRoot as Pane;
