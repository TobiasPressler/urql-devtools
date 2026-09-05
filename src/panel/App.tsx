import "./App.css";
import React, { FC } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        <Route
          path="/events"
          element={
            <TimelineProvider>
              <Timeline />
            </TimelineProvider>
          }
        />
        <Route
          path="/request"
          element={
            <RequestProvider>
              <Request />
            </RequestProvider>
          }
        />
        <Route
          path="/explorer"
          element={
            <ExplorerProvider>
              <Explorer />
            </ExplorerProvider>
          }
        />
        <Route path="/" element={<Navigate to="/explorer" replace />} />
      </Routes>
    </HashRouter>
  );
};
