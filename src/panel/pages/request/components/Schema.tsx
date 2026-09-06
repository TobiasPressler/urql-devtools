import React, { useContext, useState, useCallback } from "react";
import { GraphQLNamedType } from "graphql";
import { RequestContext } from "../../../context";
import { Stack } from "./Stack";
import { Fields } from "./Fields";
import { Search } from "./Search";
import { TopBar } from "./TopBar";
import { Collapsible } from "./Collapsible";
import { flexContainer, container, title, wrapper } from "./Schema.css";

type ActiveIds = 1 | 2 | 3;

export const Schema: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const [activeIds, setActiveIds] = useState<ActiveIds[]>([1]);
  const [stack, setStack] = useState<GraphQLNamedType[]>([]);
  const { schema } = useContext(RequestContext);

  const isActiveId = useCallback(
    (id: ActiveIds) => activeIds.includes(id),
    [activeIds],
  );

  const handleHeaderClick = useCallback(
    (id: ActiveIds) => {
      if (isActiveId(id)) {
        setActiveIds((current) => current.filter((cur) => cur !== id));
      } else {
        setActiveIds((current) => [id, ...current]);
      }
    },
    [setActiveIds, activeIds, isActiveId],
  );

  if (schema === undefined) {
    return (
      <div className={wrapper}>
        <h3 className={title}>Loading...</h3>
      </div>
    );
  }

  if (schema === null) {
    return (
      <div className={wrapper}>
        <h3 className={title}>
          Something went wrong while fetching your schema, make sure
          introspection is enabled in your settings
        </h3>
      </div>
    );
  }

  const schemaTypes = schema.getTypeMap();

  const setType = (type: GraphQLNamedType) => {
    setStack((stack) => [...stack, type]);
  };

  return (
    <div {...props} className={`${flexContainer} ${props.className || ""}`}>
      <TopBar setStack={setStack} stack={stack}>
        <Search typeMap={schemaTypes} setType={setType} />
      </TopBar>
      <div className={container}>
        {stack.length > 0 ? (
          <Stack
            currentType={stack[stack.length - 1]}
            setType={setType}
            setStack={setStack}
          />
        ) : (
          <div className={wrapper}>
            {schemaTypes.Query ? (
              <Collapsible
                title="Query"
                isActive={isActiveId(1)}
                onClick={() => handleHeaderClick(1)}
              >
                <Fields node={schemaTypes?.Query} setType={setType} />
              </Collapsible>
            ) : null}
            {schemaTypes.Mutation ? (
              <Collapsible
                title="Mutation"
                isActive={isActiveId(2)}
                onClick={() => handleHeaderClick(2)}
              >
                <Fields node={schemaTypes?.Mutation} setType={setType} />
              </Collapsible>
            ) : null}
            {schemaTypes.Subscription ? (
              <Collapsible
                title="Subscription"
                isActive={isActiveId(3)}
                onClick={() => handleHeaderClick(3)}
              >
                <Fields node={schemaTypes?.Subscription} setType={setType} />
              </Collapsible>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
