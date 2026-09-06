import { FC } from "react";
import {
  GraphQLType,
  GraphQLNamedType,
  isNonNullType,
  isListType,
} from "graphql";
import { textButton } from "./Type.css";

interface TypeProps {
  type?: GraphQLType;
  setType: (type: GraphQLNamedType) => void;
}

export const Type: FC<TypeProps> = ({ setType, type }) => {
  if (!type) return null;

  if (isNonNullType(type)) {
    return (
      <>
        <Type type={type.ofType} setType={setType} />!
      </>
    );
  }

  if (isListType(type)) {
    return (
      <>
        {"["}
        <Type type={type.ofType} setType={setType} />
        {"]"}
      </>
    );
  }

  return (
    <button onClick={() => setType(type)} className={textButton}>
      <span>{type.name}</span>
    </button>
  );
};
