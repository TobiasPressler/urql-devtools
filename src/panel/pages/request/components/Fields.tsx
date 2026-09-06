import React, { FC, Fragment } from "react";
import {
  isInterfaceType,
  isObjectType,
  isInputObjectType,
  isUnionType,
  isEnumType,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLObjectType,
} from "graphql";
import { InlineCodeHighlight } from "../../../components";
import { Type } from "./Type";
import {
  description,
  fieldWrapper,
  separator,
  name,
  deprecated,
  defaultVal,
  argWrapper,
} from "./Fields.css";

interface FieldProps {
  node?: GraphQLNamedType;
  setType: (type: GraphQLNamedType) => void;
}

export const Fields: FC<FieldProps> = ({ node, setType }) => {
  if (!node) {
    return null;
  }

  const isDeprecated = (
    field: GraphQLField<any, any, any> | GraphQLEnumValue
  ) =>
    (field as any).isDeprecated ? (
      <code className={deprecated}>{`Deprecated: ${field.deprecationReason}`}</code>
    ) : null;

  const getDefaultValue = (field: GraphQLInputField | GraphQLArgument) =>
    field.defaultValue !== undefined || null ? (
      <code className={defaultVal}>
        {` = `}
        <InlineCodeHighlight
          code={JSON.stringify(field.defaultValue)}
          language="javascript"
        />
      </code>
    ) : null;

  const getDescription = (
    field:
      | GraphQLField<any, any, any>
      | GraphQLArgument
      | GraphQLInputField
      | GraphQLEnumValue
      | GraphQLObjectType
  ) =>
    field.description ? (
      <code data-css-description className={description}>{`"${field.description}"`}</code>
    ) : null;

  if (isObjectType(node) || isInterfaceType(node)) {
    const fields = node.getFields();
    const keys = Object.keys(fields);

    return (
      <>
        {keys.map((field, i) => {
          const args = fields[field].args;
          const hasArgumentLevelDescription = args.some(
            (arg) => arg.description
          );
          const hasFieldLevelDescription = !!fields[field].description;

          return (
            <div
              key={i}
              data-multiline={`${
                hasArgumentLevelDescription || hasFieldLevelDescription
              }`}
              className={fieldWrapper}
            >
              <div>{getDescription(fields[field])}</div>
              <span>
                <span className={name}>{fields[field].name}</span>
                {args.length > 0 ? "(" : null}
              </span>
              {args.length > 0 ? (
                <>
                  <div data-multiline={`${hasArgumentLevelDescription}`} className={argWrapper}>
                    {args.map((arg, idx) => (
                      <Fragment key={idx}>
                        {getDescription(arg)}
                        <code>
                          <code>{arg.name}</code>
                          <span data-content=":" className={separator} />
                          <Type type={arg.type} setType={setType} />
                          {getDefaultValue(arg)}
                          {idx !== args.length - 1 && <span data-content="," className={separator} />}
                        </code>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              <div>
                <span>
                  {args.length ? ")" : null}
                  <span data-content=":" className={separator} />
                </span>
                <Type type={fields[field].type} setType={setType} />
                {isDeprecated(fields[field])}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  if (isInputObjectType(node)) {
    const fields = node.getFields();
    const keys = Object.keys(fields);

    return (
      <>
        {keys.map((field, i) => {
          return (
            <div key={i} className={fieldWrapper}>
              {getDescription(fields[field])}
              <span className={name}>{fields[field].name}</span>
              <span data-content=":" className={separator} />
              <Type type={fields[field].type} setType={setType} />
              {getDefaultValue(fields[field])}
            </div>
          );
        })}
      </>
    );
  }

  if (isUnionType(node)) {
    const types = node.getTypes();
    return (
      <>
        {types.map((type, i) => {
          return (
            <div key={i} data-multiline="true" className={fieldWrapper}>
              {getDescription(type)}
              <span>
                <span data-content="|" className={separator} />
                <Type type={type} setType={setType} />
              </span>
            </div>
          );
        })}
      </>
    );
  }

  if (isEnumType(node)) {
    const types = node.getValues();
    return (
      <>
        {types.map((type, i) => {
          return (
            <div key={i} data-multiline="true" className={fieldWrapper}>
              {getDescription(type)}
              <span>
                <code>{type.value}</code>
                {isDeprecated(type)}
              </span>
            </div>
          );
        })}
      </>
    );
  }

  return null;
};
