import { useEffect, useState } from "react";

type PreviousRoute = string;

export default function UseGetPreviousRoute(previous: string): PreviousRoute {
  const [previousRoute, setPreviousRoute] = useState(previous);

  useEffect(() => {
    const handleRouteChange = () => {
      const rotaAnterior = window.history.state
        ? window.history.state.as
        : null;
      setPreviousRoute(rotaAnterior);
    };

    window.addEventListener("popstate", handleRouteChange);
    handleRouteChange();

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return previousRoute;
}
