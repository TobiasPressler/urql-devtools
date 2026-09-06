import React from "react";
import { Background } from "../../components/Background";
import { Pane } from "../../components";
import { Query, Schema, Settings, Response } from "./components";
import { page, pageContent, paneSection, schemaContainer } from "./Request.css";

export const Request: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Background {...props} className={`${page} ${props.className || ""}`}>
      <Settings />
      <div className={pageContent}>
        <Query />
        <Pane initSize={{ y: 700, x: 400 }}>
          <Pane.Body>
            <section className={paneSection}>
              <Response />
            </section>
          </Pane.Body>
          <Pane
            forcedOrientation={{ isPortrait: true }}
            initSize={{ y: 350, x: 400 }}
            className={schemaContainer}
          >
            <Schema />
          </Pane>
        </Pane>
      </div>
    </Background>
  );
};
