import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";
import { appContext, AppContext } from "../context";
import { useState, useEffect, useMemo } from "react";

export default function MyApp({ Component, pageProps }) {
  const appData = useMemo(() => {
    if (typeof window !== `undefined`) {
      const result = localStorage.getItem("_data");
      if (result) {
        return JSON.parse(result);
      }
    }
  }, []);
  const [state, setState] = useState<AppContext>(
    appData ?? { notes: [], drawerOpen: false, currentNote: null, filterTags: [] }
  );

  useEffect(() => {
    if (state) {
      const content = JSON.stringify(state);
      localStorage.setItem("_data", content);
    }
  }, [state]);

  return (
    <appContext.Provider
      value={{
        state,
        setState: (state) => {
          setState((appState) => {
            let appData = state;

            if (typeof state === "function") {
              appData = state(appState);
            }
            return {
              ...appState,
              ...appData,
            };
          });
        },
      }}
    >
      <Component {...pageProps} />
    </appContext.Provider>
  );
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
