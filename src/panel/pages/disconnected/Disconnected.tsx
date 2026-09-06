import { FC, ComponentProps } from "react";
import Icon from "../../../assets/icon.svg";
import { container, header, hint, logo } from "./Disconnected.css";

export const Disconnected: FC<ComponentProps<"div">> = (props) => (
  <div {...props} className={`${container} ${props.className || ""}`}>
    <Icon className={logo} />
    <h1 className={header}>Waiting for exchange</h1>
    <p className={hint}>
      Make sure {"you're"} using the Urql Devtools exchange!
    </p>
  </div>
);
