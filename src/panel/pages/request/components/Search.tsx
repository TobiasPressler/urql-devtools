import React, {
  FC,
  useMemo,
  useCallback,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { GraphQLNamedType } from "graphql";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  container,
  icon,
  inputWrapper,
  input,
  list,
  listItem,
  textButton,
} from "./Search.css";

interface SearchProps {
  typeMap: any;
  setType: (type: GraphQLNamedType) => void;
}

export const Search: FC<SearchProps> = ({ typeMap, setType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [listOpen, setListOpen] = useState<boolean>(false);

  let typeKeys = useMemo(() => Object.keys(typeMap), [typeMap]);

  const results = useMemo(
    () =>
      (typeKeys = typeKeys.filter((key) =>
        searchValue.length === 1
          ? key.toLowerCase().startsWith(searchValue.toLowerCase())
          : key.toLowerCase().includes(searchValue.toLowerCase())
      )),
    [searchValue]
  );

  useEffect(() => {
    if (searchValue && results.length) {
      setListOpen(true);
    } else {
      setListOpen(false);
    }
  }, [searchValue, results]);

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (!containerRef?.current?.contains(e.target as Node)) {
        setListOpen(false);
      } else if (searchValue && results.length) {
        setListOpen(true);
      }
    };

    window.addEventListener("click", onOutsideClick);

    return () => {
      window.removeEventListener("click", onOutsideClick);
    };
  }, [searchValue, results]);

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value || "");
    },
    [setSearchValue]
  );

  const handleTypeSelect = useCallback(
    (type: GraphQLNamedType) => {
      setType(type);
      setListOpen(false);
    },
    [setListOpen, setType]
  );

  return (
    <div ref={containerRef} className={container}>
      <label className={inputWrapper}>
        <input
          type="search"
          value={searchValue}
          onChange={handleOnChange}
          placeholder="Search for a type in schema"
          className={input}
        />
        <FontAwesomeIcon icon={faSearch} className={icon} />
      </label>
      {listOpen ? (
        <ul className={list}>
          {results.map((res, i) => (
            <li key={i} className={listItem}>
              <button onClick={() => handleTypeSelect(typeMap[res])} className={textButton}>
                <HighlightMatch name={typeMap[res].name} term={searchValue} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

interface HighlightProps {
  name: string;
  term: string;
}

const HighlightMatch: FC<HighlightProps> = ({ name, term }) => {
  const start = name.toLowerCase().indexOf(term.toLowerCase());
  const end = start + term.length;

  return (
    <>
      <span>{name.slice(0, start)}</span>
      <strong>{name.slice(start, end)}</strong>
      <span>{name.slice(end, name.length)}</span>
    </>
  );
};
