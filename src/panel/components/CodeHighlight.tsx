import {
  FC,
  useCallback,
  ComponentPropsWithoutRef,
  useState,
  useEffect,
} from "react";
import {
  styledInlineBlock,
  styledCodeBlock,
  copyButton,
  div,
} from "./CodeHighlight.css";

type PrismLanguage = "javascript" | "graphql" | "shell";

export const CodeHighlight: FC<
  {
    code: string;
    language: PrismLanguage;
  } & ComponentPropsWithoutRef<"pre">
> = ({ code, language, ...props }) => {
  const [visible, setVisibility] = useState(false);
  const [copy, setCopied] = useState({ state: false });

  const handleClick = async () => {
    const text = document.getElementsByClassName("language")[0].textContent;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied({ state: true });
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    }
  };

  useEffect(() => {
    if (!copy) return;
    const timeout = setTimeout(function () {
      setCopied({ state: false });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [copy]);

  const handleRef = useCallback(
    (ref: HTMLPreElement | null) => {
      if (!ref) {
        return;
      }
      const child = document.createElement("code");
      child.textContent = code;

      if (ref.hasChildNodes()) {
        ref.innerHTML = "";
      }

      ref.appendChild(child);
      Prism.highlightElement(ref, code.length > 600);
    },
    [language, code],
  );

  return (
    <div
      className={div}
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
    >
      <pre
        {...props}
        ref={handleRef}
        className={`language language-${language} ${styledCodeBlock} ${props.className || ""}`}
      />
      {visible ? (
        <button onClick={handleClick} id="copy-button" className={copyButton}>
          {copy.state ? "Copied" : "Copy"}
        </button>
      ) : null}
    </div>
  );
};

export const InlineCodeHighlight: FC<
  {
    code: string;
    language: PrismLanguage;
  } & ComponentPropsWithoutRef<"pre">
> = ({ code, language, ...props }) => {
  const handleRef = useCallback(
    (ref: HTMLPreElement | null) => {
      if (!ref) {
        return;
      }

      const child = document.createElement("code");
      child.textContent = code;
      if (ref.firstChild) {
        ref.replaceChild(child, ref.firstChild);
      } else {
        ref.appendChild(child);
      }

      Prism.highlightElement(ref, false);
    },
    [language, code],
  );

  return (
    <pre
      {...props}
      ref={handleRef}
      className={`language language-${language} ${styledInlineBlock} ${props.className || ""}`}
    />
  );
};
