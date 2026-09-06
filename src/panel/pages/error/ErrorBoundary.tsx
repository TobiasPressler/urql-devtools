import React, { Component } from "react";
import { faBug, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CodeHighlight } from "../../components";
import { openExternalUrl } from "../../util";
import {
  container,
  content,
  header,
  hint,
  bugIcon,
  code,
  button,
  buttonArray,
} from "./ErrorBoundary.css";

export class ErrorBoundary extends Component<
  { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>,
  { error?: Error }
> {
  state: { error?: Error } = {};

  componentDidCatch(error: Error): void {
    this.setState({
      error: error,
    });
  }

  private handleReloadClick = () => {
    window.location.reload();
  };

  private handleReportClick = () => {
    if (!this.state.error) {
      return;
    }

    const url = createIssueUrl(this.state.error);
    openExternalUrl(url);
  };

  render(): React.ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <div {...this.props} className={`${container} ${this.props.className || ""}`}>
        <div className={content}>
          <FontAwesomeIcon icon={faBug} className={bugIcon} />
          <h1 className={header}>Unexpected Error</h1>
          <p className={hint}>
            Something went wrong and {"we're"} not totally sure why...
          </p>
          <div className={buttonArray}>
            <button data-type="icon" onClick={this.handleReloadClick} className={button}>
              <FontAwesomeIcon icon={faRedoAlt} />
            </button>
            <button onClick={this.handleReportClick} className={button}>
              Report issue
            </button>
          </div>
        </div>
        <div className={content}>
          <CodeHighlight code={this.state.error.stack || ""} language="javascript" className={code} />
        </div>
      </div>
    );
  }
}

const generateErrorTemplate = (err: Error) => {
  if (process.env.BUILD_ENV === "extension") {
    return `
  # About

  <!-- Replace the below description with a brief summary -->

  Devtools does not detect a running instance of urql.

  # Reproduction

  <!-- Replace the below steps with your reproduction. -->

  1.  Clone [this example](https://github.com/FormidableLabs/urql/tree/main/packages/react-urql/examples/1-getting-started) project
  2.  Run \`pnpm install\`
  3.  Run \`pnpm start\`
  4.  Open chrome and navigate to [http://localhost:8080](http://localhost:8080)
  5.  Open the urql devtools panel

  ## Expected result

  <!-- Tell us what you expected. -->

  - Extension detects app

  ## Actual result

  <!-- Tell us what actually happened. -->

  - Extension shows message "Waiting for exchange"

  ## Stack trace

  \`\`\`
  ${err.stack}
  \`\`\`

  # Additional info

  | environment    | version   |
  | -------------- | --------- |
  | browser        | Chrome 69 |
  | urql           | 0.0.0     |
  | urql devtools  | 0.0.0     |
  | @urql/devtools | 0.0.0     |
    `;
  }
  return `
  # About

  <!-- Replace the below description with a brief summary -->

  Devtools is unresponsive when using on an Android device with expo.

  # Reproduction

  <!-- Replace the below steps with your reproduction. -->

  1.  Clone [this example](https://github.com/kadikraman/UrqlTest) react native project
  2.  Plug in Android phone via USB
  3.  Run \`pnpm install\`
  4.  Run \`pnpm start\`
  5.  Open devtools using npx \`npx urql-devtools\`

  ## Expected result

  <!-- Tell us what you expected. -->

  - App opens on Android phone
  - Urql Devtools opens in standalone window
  - Urql devtools detects app

  ## Actual result

  <!-- Tell us what actually happened. -->

  - App opens on Android phone
  - Urql devtools opens in standalone window
  - Urql devtools stays on "waiting for exchange" notice
  ## Stack trace

  \`\`\`
  ${err.stack}
  \`\`\`

  # Additional info

  | environment    | version        |
  | -------------- | -------------- |
  | os             | Macbuntu 20.04 |
  | node           | 0.0.0          |
  | urql           | 0.0.0          |
  | urql-devtools  | 0.0.0          |
  | @urql/devtools | 0.0.0          |
  `;
};

const createIssueUrl = (err: Error) => {
  const uri = `https://github.com/FormidableLabs/urql-devtools/issues/new`;
  const params = new URLSearchParams({
    title: `[Runtime error]: ${err.message || "Unknown error"}`,
    labels: process.env.BUILD_ENV === "extension" ? "Bug" : "Bug,Electron",
    body: generateErrorTemplate(err),
  });

  return `${uri}?${params}`;
};
