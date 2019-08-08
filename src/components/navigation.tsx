import * as React from "react";

export enum Pages {
  SEARCH = "Search",
  SAVED = "Saved",
  SETTINGS = "Settings",
  CURRENT_PET = "Current Pet"
}

const NavigationContext = React.createContext<
  [Pages, React.Dispatch<React.SetStateAction<Pages>>]
>({} as [Pages, React.Dispatch<React.SetStateAction<Pages>>]);

export function NavigationProvider(
  props: React.PropsWithChildren<{}>
): JSX.Element {
  const state = React.useState(Pages.SEARCH);

  return (
    <NavigationContext.Provider value={state}>
      {props.children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): [
  Pages,
  React.Dispatch<React.SetStateAction<Pages>>
] {
  const state = React.useContext(NavigationContext);

  return state;
}
