import { FC, PropsWithChildren } from "react";
import { GraphQLNamedType } from "graphql";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Toolbar } from "../../../components";
import { flexContainer, textButton, breadcrumbs } from "./TopBar.css";

interface TopBarProps {
  setStack: (stack: GraphQLNamedType[] | []) => void;
  stack: GraphQLNamedType[] | [];
}

export const TopBar: FC<PropsWithChildren<TopBarProps>> = ({
  setStack,
  stack,
  children,
}: PropsWithChildren<TopBarProps>) => {
  const prevType = stack[stack.length - 2];

  return (
    <div className={flexContainer}>
      <Toolbar
        items={[
          {
            title: "Root",
            icon: faHome,
            disabled: stack.length < 2,
            onClick: () => setStack([]),
          },
          {
            title: prevType?.name || "Root",
            icon: faArrowLeft,
            disabled: stack.length === 0,
            onClick: () => setStack([...stack].slice(0, -1)),
          },
        ]}
      >
        {children}
      </Toolbar>

      <nav className={breadcrumbs}>
        <button
          data-disabled={stack.length === 0}
          onClick={() => setStack([])}
          className={textButton}
        >
          Root
        </button>
        {stack.length > 0
          ? (stack as GraphQLNamedType[]).map((item, i) => (
              <button
                onClick={() => setStack([...stack].slice(0, i + 1))}
                data-disabled={i === stack.length - 1}
                key={i}
                className={textButton}
              >
                {item.name}
              </button>
            ))
          : null}
      </nav>
    </div>
  );
};
