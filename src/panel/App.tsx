import "./App.css";
import "./global.css";
import { FC, useLayoutEffect } from "react";
import { HashRouter, useLocation, Navigate } from "react-router-dom";
import { Activity } from "react";
import {
  Disconnected,
  Explorer,
  Request,
  Timeline,
  Mismatch,
  ErrorBoundary,
} from "./pages";
import { Navigation } from "./components/Navigation";
import { lightThemeClass, darkThemeClass } from "./theme.css";
import {
  DevtoolsProvider,
  RequestProvider,
  ExplorerProvider,
  useDevtoolsContext,
  TimelineProvider,
} from "./context";
import { isLightMode } from "./util/EnvUtils";

// Applied to <body> (rather than a wrapping element) so the theme vars are
// also visible to portal-rendered content (e.g. TimelineTooltip), which is
// appended directly to document.body and would otherwise sit outside the
// scope of any theme class rendered inside the React tree.
const useBodyThemeClass = () => {
  useLayoutEffect(() => {
    const themeClass = isLightMode() ? lightThemeClass : darkThemeClass;
    document.body.classList.add(themeClass);
    return () => {
      document.body.classList.remove(themeClass);
    };
  }, []);
};

export const App: FC = () => {
  useBodyThemeClass();

  return (
    <ErrorBoundary>
      <DevtoolsProvider>
        <AppRoutes />
      </DevtoolsProvider>
    </ErrorBoundary>
  );
};

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
