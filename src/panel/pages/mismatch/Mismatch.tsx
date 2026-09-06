import { FC, ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { CodeHighlight } from "../../components";
import { useDevtoolsContext } from "../../context";
import {
  container,
  content,
  header,
  hint,
  icon,
  code as codeClass,
} from "./Mismatch.css";

export const Mismatch: FC<ComponentProps<"div">> = (props) => {
  const { client } = useDevtoolsContext();

  if (!client.connected) {
    return null;
  }

  return (
    <div {...props} className={`${container} ${props.className || ""}`}>
      <div className={content}>
        <FontAwesomeIcon icon={faBomb} className={icon} />
        <h1 className={header}>Version Mismatch</h1>
        <p className={hint}>
          Expected devtools exchange (@urql/devtools) version{" "}
          <em>{`>=${client.version.required}`}</em> but got{" "}
          <em>{`${client.version.actual}.`}</em>
        </p>
      </div>
      <div className={content}>
        <CodeHighlight
          code={shellCode}
          language="shell"
          className={codeClass}
        />
      </div>
    </div>
  );
};

const shellCode = `\
# Yarn
yarn add @urql/devtools

# Npm
npm update @urql/devtools
`;
