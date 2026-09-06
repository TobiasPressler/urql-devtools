import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  PropsWithChildren,
  ComponentProps,
  FC,
} from "react";
import { Portal } from "../../../components";
import { tooltipElement } from "./TimelineTooltip.css";

export const TimelineTooltip: FC<PropsWithChildren<ComponentProps<"div">>> = ({
  children,
  style: styleProp,
  ...props
}) => {
  const previousOffset = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  const offset = useMemo(() => {
    if (!ref.current) {
      return 0;
    }

    const { left, right } = ref.current.getBoundingClientRect();

    if (left < 0) {
      return Math.abs(left) + 10;
    }

    if (right > window.innerWidth) {
      return window.innerWidth - right - 10;
    }

    return previousOffset.current;
  }, [styleProp, ref]);

  previousOffset.current = offset;

  return (
    <Portal>
      <div
        {...props}
        ref={ref}
        className={tooltipElement}
        style={
          {
            ...styleProp,
            marginLeft: `${offset}px`,
            "--tooltip-offset": `${offset}px`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </Portal>
  );
};

export const useTooltip = () => {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useRef<number | undefined>(undefined);
  const [hasRef, setHasRef] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipProps, setTooltipProps] = useState<
    Omit<ComponentProps<typeof TimelineTooltip>, "ref">
  >({});

  const calculateTooltipPosition = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const { x, y, width } = ref.current.getBoundingClientRect();

    setTooltipProps({
      style: {
        position: "fixed",
        left: width > 12 ? mouseX.current : x + width / 2,
        bottom: window.innerHeight - y + 10,
        transform: `translateX(-50%)`,
      },
    });
  }, []);

  const handleTargetRef = useMemo(() => {
    const fn = (r: null | HTMLElement) => {
      if (r === null) {
        return;
      }

      ref.current = r;
      calculateTooltipPosition();
      setHasRef(true);
    };
    fn.current = ref.current;
    return fn;
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const mObserver = new MutationObserver(calculateTooltipPosition);
    const rObserver = new ResizeObserver(() =>
      requestAnimationFrame(calculateTooltipPosition)
    );
    mObserver.observe(ref.current, {
      attributes: true,
      childList: true,
    });
    rObserver.observe(ref.current);
    return () => {
      mObserver.disconnect();
      rObserver.disconnect();
    };
  }, [hasRef]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleMouseEnter = (e: MouseEvent) => {
      handleMouseMove(e);
      setIsVisible(true);
    };
    const setInvisible = () => setIsVisible(false);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      calculateTooltipPosition();
    };
    ref.current.addEventListener("mouseenter", handleMouseEnter);
    ref.current.addEventListener("mouseleave", setInvisible);
    ref.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener("mouseenter", handleMouseEnter);
      ref.current.removeEventListener("mouseleave", setInvisible);
      ref.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasRef]);

  return useMemo(
    () => ({
      ref: handleTargetRef,
      tooltipProps,
      isVisible,
    }),
    [handleTargetRef, tooltipProps, isVisible]
  );
};
