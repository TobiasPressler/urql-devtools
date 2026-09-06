import "./App.css";
import "./global.css";
import { createContext, FC, use, useContext, useLayoutEffect, useState } from "react";
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

const NavigationContext = createContext<{
  active: "/explorer" | "/events" | "/request";
  setActive: (active: "/explorer" | "/events" | "/request") => void;
}>({ active: "/explorer", setActive: () => {} });

export const useNavigationContext = () => {
  const context = use(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within a NavigationContext.Provider");
  }
  return context;
};

const RoutedContent: FC = () => {
  const { active } = useNavigationContext();

  return (
   <>
      <Activity mode={active === "/events" ? "visible" : "hidden"}>
        <TimelineProvider>
          <Timeline />
        </TimelineProvider>
      </Activity>
      <Activity mode={active === "/request" ? "visible" : "hidden"}>
        <RequestProvider>
          <Request />
        </RequestProvider>
      </Activity>
      <Activity
        mode={
          active === "/explorer" ? "visible" : "hidden"
        }
      >
        <ExplorerProvider>
          <Explorer />
        </ExplorerProvider>
      </Activity>
    </>
  );
};

export const AppRoutes: FC = () => {
  const [active, setActive] = useState<"/explorer" | "/events" | "/request">("/explorer");
  const { client } = useDevtoolsContext();

  if (!client.connected) {
    return <Disconnected />;
  }

  if (client.version.mismatch) {
    return <Mismatch />;
  }

  return (
     <NavigationContext.Provider value={{ active, setActive }}>
      <Navigation
        items={[
          { link: "/explorer", label: "Explorer" },
          { link: "/events", label: "Events" },
          { link: "/request", label: "Request" },
        ]}
      />
      <RoutedContent />
    </NavigationContext.Provider>
  );
};
