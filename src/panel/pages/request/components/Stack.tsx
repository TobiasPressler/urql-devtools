import { FC, useMemo, useCallback, useState } from "react";
import {
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInterfaceType,
} from "graphql";
import { Fields } from "./Fields";
import { Collapsible } from "./Collapsible";
import {
  stackWrapper,
  box,
  typeKind,
  description,
  typeNameWrapper,
} from "./Stack.css";

const getKind = (node: GraphQLNamedType) => {
  if (node instanceof GraphQLScalarType) return "scalar";
  if (node instanceof GraphQLInputObjectType) return "input";
  if (node instanceof GraphQLUnionType) return "union";
  if (node instanceof GraphQLEnumType) return "enum";
  if (node instanceof GraphQLInterfaceType) return "interface";

  return "type";
};

interface StackProps {
  currentType?: GraphQLNamedType;
  setStack: (type: GraphQLNamedType[] | []) => void;
  setType: (type: GraphQLNamedType) => void;
}

type ActiveIds = 1 | 2;

export const Stack: FC<StackProps> = ({ currentType, setType }) => {
  const [activeIds, setActiveIds] = useState<ActiveIds[]>([1, 2]);

  if (!currentType) {
    return null;
  }

  const kind = useMemo(() => getKind(currentType), [currentType]);

  const hasFields = useMemo(() => {
    return Boolean(
      "getFields" in currentType ||
      "getTypes" in currentType ||
      "getValues" in currentType,
    );
  }, [currentType]);

  const isActiveId = useCallback(
    (id: ActiveIds) => activeIds.includes(id),
    [activeIds],
  );

  const handleOnClick = useCallback(
    (id: ActiveIds) => {
      if (isActiveId(id)) {
        setActiveIds((current) => current.filter((cur) => cur !== id));
      } else {
        setActiveIds((current) => [id, ...current]);
      }
    },
    [setActiveIds, activeIds, isActiveId],
  );

  return (
    <div className={stackWrapper}>
      <div className={typeNameWrapper}>
        <code data-kind={kind} className={typeKind}>
          {kind}
        </code>
        <span>{currentType.name}</span>
      </div>
      {currentType.description ? (
        <Collapsible
          title="Description"
          onClick={() => handleOnClick(1)}
          isActive={isActiveId(1)}
        >
          <p className={description}>{currentType.description}</p>
        </Collapsible>
      ) : null}
      {hasFields ? (
        <Collapsible
          title="Fields"
          onClick={() => handleOnClick(2)}
          isActive={isActiveId(2)}
        >
          <div className={box}>
            <Fields node={currentType} setType={setType} />
          </div>
        </Collapsible>
      ) : null}
    </div>
  );
};

export { box as Box };
