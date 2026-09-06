import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/icon.svg";
import { container, item, logo } from "./Navigation.css";

type NavItem = { link: string; label: string };

const LogoIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} className={`${logo} ${props.className || ""}`} />
);

export const Navigation: FC<
  { items: NavItem[] } & React.HTMLAttributes<HTMLDivElement>
> = ({ items, ...props }) => (
  <div {...props} className={`${container} ${props.className || ""}`}>
    {items.map((itemData, index) => (
      <NavLink
        key={index}
        to={itemData.link}
        className={({ isActive }) =>
          `${item.default}${isActive ? " active" : ""}`
        }
      >
        {itemData.label}
      </NavLink>
    ))}

    <a
      href="https://formidable.com/open-source/urql/"
      target="_blank"
      rel="noopener"
      title="urql Documentation"
      className={item.alignRight}
    >
      <LogoIcon />
    </a>
  </div>
);
