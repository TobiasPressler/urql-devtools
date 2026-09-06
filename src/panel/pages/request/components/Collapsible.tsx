import React from "react";
import { Arrow } from "../../../components";
import { collapsibleHeader } from "./Collapsible.css";

interface CollapsibleProps {
  title: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  isActive,
  children,
  onClick,
  className,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        aria-expanded={isActive}
        className={`${collapsibleHeader} ${className || ""}`}
      >
        <Arrow data-active={isActive} />
        <span>{title}</span>
      </button>
      {isActive && <div>{children}</div>}
    </>
  );
};
