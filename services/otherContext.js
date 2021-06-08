import React from "react";

export const CurrentPage = React.createContext([false, () => {}]);

export const CurrentPageProvider = ({ children }) => {
  const [state, setState] = React.useState(false);

  return (
    <CurrentPage.Provider value={[state, setState]}>
      {children}
    </CurrentPage.Provider>
  );
};
