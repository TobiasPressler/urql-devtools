import React, { FC } from "react";
import Icon from "../../assets/icon.svg";
import { useNavigationContext } from "../App";
import { container, item, logo } from "./Navigation.css";

type NavItem = { link: string; label: string };

const LogoIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} className={`${logo} ${props.className || ""}`} />
);

export const Navigation: FC<
  { items: NavItem[] } & React.HTMLAttributes<HTMLDivElement>
> = ({ items, ...props }) => {
  const { active, setActive } = useNavigationContext();
  return (
    <div {...props} className={`${container} ${props.className || ""}`}>
      {items.map((itemData, index) => (
        <button
          key={index}
          onClick={() => {
            setActive(itemData.link as "/explorer" | "/events" | "/request");
          }}
          className={`${item.default}${active === itemData.link ? " active" : ""}`}
        >
          {itemData.label}
        </button>
      ))}

      <a
        href="https://formidable.com/open-source/urql/"
        target="_blank"
        rel="noopener noreferrer"
        title="urql Documentation"
        className={item.alignRight}
      >
        <LogoIcon />
      </a>
    </div>
  );
};
