import { FC } from "react";
import { container, tab } from "./Tabs.css";

interface TabsProps<T = string> {
  readonly active: T;
  readonly options: readonly { readonly label: string; readonly value: T }[];
  readonly setActive: (active: T) => void;
}

export const Tabs: FC<TabsProps> = ({ active, options, setActive }) => (
  <div className={container}>
    {options.map((o) => (
      <h3
        key={o.value}
        data-active={o.value === active}
        onClick={() => setActive(o.value)}
        className={tab}
      >
        {o.label}
      </h3>
    ))}
  </div>
);
