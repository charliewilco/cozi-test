import * as React from "react";
import { View } from "react-native";
import { Settings } from "./settings";
import { Search } from "./search";
import { Saved } from "./saved";
import { CurrentPet } from "./current-pet";
import { Pages } from "../components/navigation";

interface IPageProps {
  page: Pages;
}

function usePageComponent(page: Pages): () => JSX.Element {
  switch (page) {
    case Pages.SEARCH:
      return Search;
    case Pages.SAVED:
      return Saved;
    case Pages.SETTINGS:
      return Settings;
    case Pages.CURRENT_PET:
      return CurrentPet;
    default:
      throw new Error("Must specify page");
  }
}

export default function Page(props: IPageProps): JSX.Element {
  const Page = usePageComponent(props.page);
  return (
    <View>
      <Page />
    </View>
  );
}
