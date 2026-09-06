import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { container, item, itemActive } from "./Toolbar.css";

type ToolbarItem = {
  title: string;
  icon: IconProp;
  onClick: () => void;
  id?: string;
  active?: boolean;
  disabled?: boolean;
};

export const Toolbar: FC<PropsWithChildren<
  { items: ToolbarItem[] } & HTMLAttributes<HTMLDivElement>
>> = ({ items, children, ...props }) => (
  <div {...props} className={`${container} ${props.className || ""}`}>
    {items.map((itemData, index) => (
      <button
        key={index}
        title={itemData.title}
        onClick={itemData.onClick}
        id={itemData.id}
        disabled={itemData.disabled}
        className={`${itemData.active ? itemActive : item}`}
      >
        <FontAwesomeIcon icon={itemData.icon}/>
      </button>
    ))}
    {children}
  </div>
);
