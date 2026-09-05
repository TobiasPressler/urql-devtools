import "./App.css";
import React, { FC } from "react";
import { HashRouter, useLocation, Navigate } from "react-router-dom";
import { Activity } from "react";
import { ThemeProvider } from "styled-components";
import {
  Disconnected,
  Explorer,
  Request,
  Timeline,
  Mismatch,
  ErrorBoundary,
} from "./pages";
import { Navigation } from "./components/Navigation";
import { lightTheme, darkTheme, GlobalStyle } from "./theme";
import {
  DevtoolsProvider,
  RequestProvider,
  ExplorerProvider,
  useDevtoolsContext,
  TimelineProvider,
} from "./context";
import { isLightMode } from "./util/EnvUtils";

export const App: FC = () => (
  <ThemeProvider theme={isLightMode() ? lightTheme : darkTheme}>
    <ErrorBoundary>
      <DevtoolsProvider>
        <AppRoutes />
      </DevtoolsProvider>
    </ErrorBoundary>
    <GlobalStyle />
  </ThemeProvider>
);

const RoutedContent: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Activity mode={pathname === "/events" ? "visible" : "hidden"}>
        <TimelineProvider>
          <Timeline />
        </TimelineProvider>
      </Activity>
      <Activity mode={pathname === "/request" ? "visible" : "hidden"}>
        <RequestProvider>
          <Request />
        </RequestProvider>
      </Activity>
      <Activity mode={pathname === "/explorer" || pathname === "/" ? "visible" : "hidden"}>
        <ExplorerProvider>
          <Explorer />
        </ExplorerProvider>
      </Activity>
      {pathname === "/" && <Navigate to="/explorer" replace />}
    </>
  );
};

export const AppRoutes: FC = () => {
  const { client } = useDevtoolsContext();

  if (!client.connected) {
    return <Disconnected />;
  }

  if (client.version.mismatch) {
    return <Mismatch />;
  }

  return (
    <HashRouter>
      <Navigation
        items={[
          { link: "/explorer", label: "Explorer" },
          { link: "/events", label: "Events" },
          { link: "/request", label: "Request" },
        ]}
      />
      <RoutedContent />
    </HashRouter>
  );
};
