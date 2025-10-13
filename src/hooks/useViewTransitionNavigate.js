import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isViewTransitionSupported, resetPageView, runViewTransition } from "../utils/viewTransition";

const isModifiedEvent = (event) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0;

export default function useViewTransitionNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (to, options = {}) => {
      if (typeof to === "number") {
        navigate(to);
        resetPageView();
        return;
      }

      const targetPath = typeof to === "string" ? to : to?.pathname;
      if (targetPath && targetPath === location.pathname && !options.replace) {
        return;
      }

      const executeNavigation = () => navigate(to, options);
      const transition = runViewTransition(executeNavigation);

      if (!transition) {
        if (!isViewTransitionSupported()) {
          resetPageView();
        }
        return;
      }

      transition.finished
        .catch(() => {})
        .then(() => {
          resetPageView();
        });
    },
    [location.pathname, navigate]
  );
}

export const createViewTransitionClickHandler = (navigateWithTransition, to, options) => (event) => {
  if (!event || typeof event.preventDefault !== "function") return;
  if (event.defaultPrevented) return;
  if (isModifiedEvent(event)) return;

  event.preventDefault();
  navigateWithTransition(to, options);
};
