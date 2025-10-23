import * as React from "react";
import { actionTypes, dispatch, toast as toastFunction, memoryState, listeners } from "./toast-utils.js";

// ------------------------------
// ✅ Custom Toast Hook
// ------------------------------
function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index !== -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast: toastFunction,
    dismiss: (toastId) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast };
